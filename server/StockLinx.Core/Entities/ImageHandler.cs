namespace StockLinx.Core.Entities
{
    public class ImageHandler
    {
        public static void UploadBase64AsFile(string base64String, string fileName)
        {
            byte[] imageBytes = Convert.FromBase64String(base64String);

            string uploadDir = Path.Combine(Directory.GetCurrentDirectory(), "Resources/Images");
            if (!Directory.Exists(uploadDir))
            {
                Directory.CreateDirectory(uploadDir);
            }
            string filePath = Path.Combine(uploadDir, fileName);

            System.IO.File.WriteAllBytes(filePath, imageBytes);
        }
    }
}
