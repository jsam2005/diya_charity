# How to Edit Running Line Content

The running line is the scrolling text that appears at the top of the website header.

## Method 1: Edit JSON File Directly (Recommended for GoDaddy)

1. **Via GoDaddy File Manager:**
   - Log in to your GoDaddy hosting account
   - Open **File Manager**
   - Navigate to: `backend-php/data/running-line.json`
   - Click **Edit** or **View/Edit**
   - Update the `en` (English) and `ta` (Tamil) fields
   - Save the file

2. **Via FTP/SFTP:**
   - Connect to your server
   - Navigate to: `backend-php/data/running-line.json`
   - Download, edit, and upload the file

## Method 2: Use Web Interface (if enabled)

If you have access to the PHP file, you can use:
- URL: `https://yourdomain.com/api/edit-running-line.php`
- This provides a simple web form to edit the content

## File Structure

The JSON file should look like this:

```json
{
  "en": "Your English text here...",
  "ta": "உங்கள் தமிழ் உரை இங்கே..."
}
```

## Important Notes

- **Both fields are required:** You must provide both English (`en`) and Tamil (`ta`) text
- **Save as UTF-8:** Make sure the file is saved with UTF-8 encoding to support Tamil characters
- **Refresh website:** After editing, refresh your website to see the changes
- **Backup first:** Always backup the file before making changes

## API Endpoints

The running line is served via these API endpoints:
- `GET /api/running-line` - Get current content
- `POST /api/running-line` - Update content (requires JSON: `{"en": "...", "ta": "..."}`)
