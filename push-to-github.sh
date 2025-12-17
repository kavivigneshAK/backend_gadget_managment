#!/bin/bash

echo "🚀 Pushing Gadget Hub Backend to GitHub..."
echo "Repository: https://github.com/kavivigneshAK/backend_gadget_managment.git"
echo ""
echo "📋 Your code is ready to push with:"
echo "   ✅ Complete MERN e-commerce backend"
echo "   ✅ MongoDB Atlas integration" 
echo "   ✅ 40+ products across 8 categories"
echo "   ✅ User authentication & admin panel"
echo "   ✅ Cart, wishlist & order management"
echo ""
echo "🔐 Authentication required:"
echo "   Username: kavivigneshAK"
echo "   Password: [Your GitHub Personal Access Token]"
echo ""
echo "💡 If you don't have a token:"
echo "   1. Go to GitHub.com → Settings → Developer settings"
echo "   2. Personal access tokens → Generate new token"
echo "   3. Select 'repo' permissions"
echo ""

# Attempt to push
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Successfully pushed to GitHub!"
    echo "🌐 Repository: https://github.com/kavivigneshAK/backend_gadget_managment"
    echo "🚀 Ready for Render deployment!"
else
    echo ""
    echo "❌ Push failed. Please check your authentication."
    echo "💡 Try: gh auth login (if you have GitHub CLI)"
fi