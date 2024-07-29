using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class EmployeeService : Service<Employee>, IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IFilterService<Employee> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public EmployeeService(
            IRepository<Employee> repository,
            IEmployeeRepository employeeRepository,
            ICustomLogService customLogService,
            IFilterService<Employee> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _employeeRepository = employeeRepository;
            _customLogService = customLogService;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<EmployeeDto> GetDtoAsync(Guid id)
        {
            Employee employee = await GetByIdAsync(id);
            return await _employeeRepository.GetDtoAsync(employee);
        }

        public async Task<List<EmployeeDto>> GetAllDtosAsync()
        {
            return await _employeeRepository.GetAllDtosAsync();
        }

        public async Task<EmployeeDto> CreateEmployeeAsync(EmployeeCreateDto dto)
        {
            Employee employee = _mapper.Map<Employee>(dto);
            await _employeeRepository.AddAsync(employee);
            await CreateCheckLogAsync("Create", employee);
            await _unitOfWork.CommitAsync();
            return await _employeeRepository.GetDtoAsync(employee);
        }

        public async Task<List<EmployeeDto>> CreateRangeEmployeeAsync(List<EmployeeCreateDto> dtos)
        {
            List<Employee> employees = new List<Employee>();
            foreach (EmployeeCreateDto dto in dtos)
            {
                Employee employee = _mapper.Map<Employee>(dto);
                employees.Add(employee);
                await CreateCheckLogAsync("Create", employee);
            }
            await _employeeRepository.AddRangeAsync(employees);
            await _unitOfWork.CommitAsync();
            return await _employeeRepository.GetDtosAsync(employees);
        }

        public async Task<EmployeeDto> UpdateEmployeeAsync(EmployeeUpdateDto dto)
        {
            Employee employeeInDb = await GetByIdAsync(dto.Id);
            Employee employee = _mapper.Map<Employee>(dto);
            employee.UpdatedDate = DateTime.UtcNow;
            _employeeRepository.Update(employeeInDb, employee);
            await CreateCheckLogAsync("Update", employee);
            await _unitOfWork.CommitAsync();
            return await _employeeRepository.GetDtoAsync(employee);
        }

        public async Task DeleteEmployeeAsync(Guid id)
        {
            await _employeeRepository.CanDeleteAsync(id);
            Employee employee = await GetByIdAsync(id);
            await CreateCheckLogAsync("Delete", employee);
            _employeeRepository.Remove(employee);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeEmployeeAsync(List<Guid> ids)
        {
            List<Employee> employees = new List<Employee>();
            foreach (Guid id in ids)
            {
                await _employeeRepository.CanDeleteAsync(id);
                Employee employee = await GetByIdAsync(id);
                employees.Add(employee);
                await CreateCheckLogAsync("Delete", employee);
            }
            _employeeRepository.RemoveRange(employees);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<EmployeeDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return await _employeeRepository.GetDtosAsync(result.ToList());
        }

        public async Task<Guid> GetCompanyIdAsync(Guid employeeId)
        {
            return await _employeeRepository.GetCompanyIdAsync(employeeId);
        }

        public async Task CreateCheckLogAsync(string action, Employee employee)
        {
            await _customLogService.CreateCustomLog(
                action,
                "Employee",
                employee.Id,
                employee.FirstName + " " + employee.LastName
            );
        }
        
        public async Task<List<EmployeeDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            return await _employeeRepository.GetDisplayDtos(ids);
        }

        public async Task<SubmissionDto> GetSubmissionDto(Guid employeeId)
        {
            return await _employeeRepository.GetSubmissionDto(employeeId);
        }
    }
}
