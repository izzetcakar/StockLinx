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
        public static string GetBase64FromFile(string fileName)
        {
            string uploadDir = Path.Combine(Directory.GetCurrentDirectory(), "Resources/Images");
            string filePath = Path.Combine(uploadDir, fileName);

            byte[] imageBytes = System.IO.File.ReadAllBytes(filePath);
            string base64String = Convert.ToBase64String(imageBytes);

            return base64String;
        }
    }
}
