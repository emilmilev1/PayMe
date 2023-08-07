using Microsoft.AspNetCore.Http;
using PayMe.Application.Photos;

namespace PayMe.Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUpload> AddPhoto(IFormFile file);
        
        Task<string?> DeletePhoto(string publicId);
    }
}