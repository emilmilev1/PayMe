using MediatR;

namespace PayMe.Application.Core
{
    public class Result<T> : IRequest<Unit>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; } = default!;
        public string Error { get; set; } = null!;

        public static Result<T> Success(T value) => new Result<T> {IsSuccess = true, Value = value};
        public static Result<T> Failure(string error) => new Result<T> { IsSuccess = false, Error = error };
    }
}