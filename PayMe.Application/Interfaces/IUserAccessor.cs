namespace PayMe.Application.Interfaces
{
    public interface IUserAccessor
    {
        string GetUsername();
        
        string GetUserId();
    }
}