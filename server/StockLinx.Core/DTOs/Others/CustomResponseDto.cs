using System.Text.Json.Serialization;

namespace StockLinx.Core.DTOs.Others
{
    public class CustomResponseDto<T>
    {
        public T Data { get; set; }
        [JsonIgnore]
        public int StatusCode { get; set; }
        public List<string> Errors { get; set; }
        public string SuccessMessage { get; set; }
        public static CustomResponseDto<T> Success(int statusCode, string successMessage)
        {
            return new CustomResponseDto<T> { StatusCode = statusCode, SuccessMessage = successMessage };
        }
        public static CustomResponseDto<T> Success(int statusCode, T data)
        {
            return new CustomResponseDto<T> { StatusCode = statusCode, Data = data, Errors = null };
        }
        public static CustomResponseDto<T> Success(int statusCode)
        {
            return new CustomResponseDto<T> { StatusCode = statusCode };
        }
        public static CustomResponseDto<T> Fail(int statusCode, List<string> errors)
        {
            return new CustomResponseDto<T> { StatusCode = statusCode, Errors = errors };
        }
        public static CustomResponseDto<T> Fail(int statusCode, string error)
        {
            return new CustomResponseDto<T> { StatusCode = statusCode, Errors = new List<string> { error } };
        }
    }
}
