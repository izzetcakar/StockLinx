using Microsoft.AspNetCore.Mvc.Filters;
using StockLinx.Core.Services;

namespace StockLinx.API.ActionFilters
{

    public class PermissionFilter : IAsyncActionFilter
    {
        private readonly IUserService _userService;
        private readonly IPermissionService _permissionService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PermissionFilter(IUserService userService, IPermissionService permissionService, IHttpContextAccessor httpContextAccessor)
        {
            _userService = userService;
            _permissionService = permissionService;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            bool isAdmin = await _userService.CheckCurrentUserAdmin();
            if (isAdmin)
            {
                await next();
            }
            var dtoObject = context.ActionArguments["dto"];
            var companyIdProperty = dtoObject?.GetType().GetProperty("companyId");
            if (companyIdProperty != null)
            {
                var companyId = (Guid)companyIdProperty.GetValue(dtoObject);
                await _permissionService.VerifyCompanyAccessAsync(companyId);
            }
            await next();
        }
    }
}
