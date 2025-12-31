# Submission Checklist

## Pre-Submission Checklist

### Code Quality
- [x] All features implemented as per requirements
- [x] Code follows standard practices
- [x] Proper error handling
- [x] Input validation on all endpoints
- [x] Security best practices implemented

### Testing
- [x] At least 5 unit tests written
- [x] Tests cover authentication, users, and admin functions
- [x] All tests pass

### Documentation
- [x] README.md with comprehensive documentation
- [x] API documentation included
- [x] Setup instructions provided
- [x] Deployment instructions included
- [x] Environment variables documented

### Security
- [x] .env files in .gitignore
- [x] No sensitive data in code
- [x] Password hashing implemented
- [x] JWT authentication
- [x] CORS configured

### Deployment
- [ ] Backend deployed (Render/Railway/Heroku/Vercel)
- [ ] Frontend deployed (Vercel/Netlify)
- [ ] Database configured (MongoDB Atlas)
- [ ] Environment variables set on hosting platforms
- [ ] CORS updated for production frontend URL
- [ ] All endpoints tested on deployed version

### GitHub Repository
- [ ] Repository is public
- [ ] Proper commit history (not single bulk commit)
- [ ] README.md in root
- [ ] .gitignore properly configured
- [ ] No sensitive data committed

### Video Walkthrough
- [ ] 3-5 minute screen recording
- [ ] Shows login & role-based access
- [ ] Shows user management features
- [ ] Shows admin dashboard
- [ ] Shows profile management
- [ ] Shows mobile responsiveness
- [ ] Shows API demonstration (Postman/browser)
- [ ] Shows live deployment links
- [ ] Uploaded to Google Drive/YouTube (public/unlisted link)

## Submission Format

### File Name
`Backend Intern_Assessment_[Your_Name]_December 2025.docx`

### Email Details
- **To**: career@purplemerit.com
- **Subject**: Backend Intern Assessment Submission - [Your Name]
- **Attachments**: Word document (.docx)

### Document Contents
1. GitHub Repository Link
2. Frontend Deployment Link
3. Backend Deployment Link (API URL)
4. Video Walkthrough Link
5. Brief summary of implementation
6. Any additional notes or features

### Important Notes
- ⚠️ **Deadline**: 31st December 2025, 11:00 AM (IST)
- ⚠️ **NO EXTENSIONS GRANTED**
- ⚠️ **LATE SUBMISSIONS ARE DISQUALIFIED**
- ✅ Ensure all links are accessible
- ✅ Test all functionality before submission
- ✅ Verify video link is accessible

## Quick Test Before Submission

1. **Backend Tests:**
   ```bash
   cd backend
   npm test
   ```

2. **Frontend Build:**
   ```bash
   cd frontend
   npm run build
   ```

3. **Manual Testing:**
   - [ ] Signup new user
   - [ ] Login with credentials
   - [ ] View profile
   - [ ] Update profile
   - [ ] Change password
   - [ ] Admin: View all users
   - [ ] Admin: Activate user
   - [ ] Admin: Deactivate user
   - [ ] Test pagination
   - [ ] Test protected routes
   - [ ] Test error handling
   - [ ] Test on mobile device

## Final Steps

1. Create admin user in database
2. Deploy backend and get API URL
3. Update frontend .env with backend URL
4. Deploy frontend
5. Update backend CORS with frontend URL
6. Test complete flow
7. Record video walkthrough
8. Create Word document
9. Submit via email before deadline

Good luck! 🚀

