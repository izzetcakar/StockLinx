namespace StockLinx.Core.Entities
{
    public class TagUtils
    {
        public static string Check(string tag)
        {
            if (string.IsNullOrEmpty(tag))
            {
                throw new Exception("Tag is required");
            }
            return tag.Trim();
        }

        public static List<string> Check(List<string> tags)
        {
            if (tags == null || tags.Count == 0)
            {
                throw new Exception("Tags are required");
            }
            if (tags.Any(x => string.IsNullOrEmpty(x)))
            {
                throw new Exception("Tag is required");
            }
            if (tags.Count != tags.Distinct().Count())
            {
                throw new Exception("Duplicate tags are not allowed");
            }
            return tags.Select(x => x.Trim()).ToList();
        }
    }
}
