# 🔧 Bypass Sucuri CDN - Use Direct Server IP

## 🚨 Why This Helps

Sucuri Cloudproxy is a CDN/security service that caches your files. This is causing the browser to load old cached `index.html` files. Bypassing Sucuri will make your site load directly from your server without caching.

## ✅ Option 1: Disable Sucuri in GoDaddy (Recommended)

### Steps:

1. **Log into GoDaddy cPanel**
2. **Find "Sucuri" or "Security" section**
3. **Look for:**
   - "Sucuri Security"
   - "Cloudproxy"
   - "CDN Settings"
   - "Security Settings"
4. **Disable or pause Sucuri:**
   - Look for "Disable" or "Pause" option
   - Or "Bypass CDN" option
   - Save changes

5. **Wait 5-10 minutes** for changes to propagate

6. **Test:** Visit `https://www.dctnow.ngo`
   - Should now load directly from your server
   - No CDN caching

## ✅ Option 2: Access Direct Server IP

### Find Your Server IP:

1. **In GoDaddy cPanel:**
   - Look for "Server Information" or "Account Details"
   - Find "Shared IP Address" or "Dedicated IP"
   - Note the IP address

2. **Or check via SSH/Terminal:**
   ```bash
   # If you have SSH access
   curl ifconfig.me
   ```

### Access via IP:

**Note:** This might not work if Sucuri is mandatory, but you can try:

1. **Try:** `http://YOUR_SERVER_IP/` (replace with actual IP)
2. **Or:** Add to `/etc/hosts` (Windows: `C:\Windows\System32\drivers\etc\hosts`):
   ```
   YOUR_SERVER_IP www.dctnow.ngo
   YOUR_SERVER_IP dctnow.ngo
   ```
3. **Then visit:** `http://www.dctnow.ngo` (will bypass DNS/CDN)

## ✅ Option 3: Use Direct Server Hostname

**GoDaddy might provide a direct server hostname:**

1. **In cPanel, look for:**
   - "Server Name" or "Hostname"
   - Usually something like: `server123.hosting.com` or `ip-xxx-xxx-xxx-xxx.ip.secureserver.net`

2. **Try accessing:**
   - `https://server123.hosting.com/~yourusername/`
   - Or check cPanel for "Server Information"

## ✅ Option 4: Contact GoDaddy Support

**If you can't find Sucuri settings:**

1. **Contact GoDaddy Support**
2. **Ask:** "How do I disable Sucuri Cloudproxy for my domain?"
3. **Or:** "How do I access my site directly without CDN caching?"

## 🔍 Verify Sucuri is Bypassed

**After disabling, check response headers:**

1. **Press `F12` → Network tab**
2. **Visit your site**
3. **Click on `index.html`**
4. **Check "Response Headers":**
   - ❌ Should NOT see: `x-sucuri-cache` or `x-sucuri-id`
   - ✅ Should see: Direct server headers

## 📋 After Bypassing Sucuri

**Once Sucuri is disabled:**

1. **Clear browser cache** (F12 → Application → Clear site data)
2. **Visit:** `https://www.dctnow.ngo`
3. **Should load fresh files** without CDN cache
4. **The `.htaccess` cache prevention headers will work** directly on your server

## ⚠️ Important Notes

- **Security:** Sucuri provides security features (DDoS protection, firewall). Disabling it removes these protections.
- **Performance:** CDN can improve load times. Direct server access might be slightly slower.
- **SSL:** Make sure your direct server has SSL certificate configured.

## 🎯 Quick Test

**To test if Sucuri is the issue:**

1. **Try accessing with a query parameter:** `https://www.dctnow.ngo/?nocache=12345`
2. **If this works but regular URL doesn't** → Confirms it's CDN cache
3. **Disable Sucuri** to fix permanently

---

**After disabling Sucuri, your cache prevention headers in `.htaccess` will work directly on your server, and browsers will fetch fresh `index.html` files.**
