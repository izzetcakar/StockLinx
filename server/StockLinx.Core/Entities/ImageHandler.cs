namespace StockLinx.Core.Entities
{
    public class ImageHandler
    {
        public static void UploadBase64AsJpg(string base64String, string fileName, string path)
        {
            var base64 = base64String.Split(',')[1];
            byte[] imageBytes = Convert.FromBase64String(base64);

            string uploadDir = Path.Combine(Directory.GetCurrentDirectory(), $"Resources/Images/{path}");
            if (!Directory.Exists(uploadDir))
            {
                Directory.CreateDirectory(uploadDir);
            }

            string filePath = Path.Combine(uploadDir, Path.ChangeExtension(fileName, "jpg"));

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            File.WriteAllBytes(filePath, imageBytes);
        }

        public static string GetBase64FromFilePath(string relativePath)
        {
            string uploadDir = Path.Combine(Directory.GetCurrentDirectory(), "Resources/Images");
            string filePath = Path.Combine(uploadDir, relativePath);

            if (File.Exists(filePath))
            {
                //byte[] fileBytes = File.ReadAllBytes(filePath);
                //string base64String = Convert.ToBase64String(fileBytes);
                //return base64String;
                return filePath;
            }
            return null;
        }
    }
}
