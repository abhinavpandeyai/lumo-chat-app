# Avatar Images

Place your profile pictures in this folder with the following naming convention:

## For Demo Users:
- `admin.jpg` or `admin.png` - Admin user profile picture
- `user.jpg` or `user.png` - Regular user profile picture

## For Custom Users:
- `{userId}.jpg` or `{userId}.png` - Custom user profile pictures

## Recommended Specifications:
- **Size**: 200x200 pixels or larger (square ratio preferred)
- **Format**: JPG, PNG, or WebP
- **File size**: Under 500KB for optimal loading

## Default Fallback:
If no image is found, the app will generate a fallback avatar with the user's initials.

## Example Structure:
```
public/images/avatars/
├── admin.jpg          # Admin user avatar
├── user.jpg           # Regular user avatar
├── default-male.jpg   # Default male avatar
├── default-female.jpg # Default female avatar
└── pcsoft-logo.png     # pcsoft logo
```

## Usage in Code:
The avatars are referenced as `/images/avatars/{filename}` in the application.
