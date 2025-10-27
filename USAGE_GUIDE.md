# InfAIra Dashboard - Usage Guide

## Quick Start

The application is now running at **http://localhost:3000**

## Default User

By default, you're logged in as **Admin** with full access to all solutions.

## Switching User Roles

To test different user roles and permissions, you can modify the default user in the browser console:

```javascript
// Switch to FM Operations role
localStorage.setItem('infaira_user', JSON.stringify({
  id: 2,
  username: 'Sarah Operations',
  email: 'sarah.ops@infaira.com',
  role: 'FM Operations',
  avatar: 'https://ui-avatars.com/api/?name=Sarah+Operations&background=22c55e&color=fff',
  permissions: ['ops', 'command', 'cvs']
}));
// Refresh the page

// Switch to Viewer role
localStorage.setItem('infaira_user', JSON.stringify({
  id: 3,
  username: 'Mike Viewer',
  email: 'mike.viewer@infaira.com',
  role: 'Viewer',
  avatar: 'https://ui-avatars.com/api/?name=Mike+Viewer&background=f59e0b&color=fff',
  permissions: ['sustain', 'command'],
  readOnly: true
}));
// Refresh the page

// Switch back to Admin
localStorage.setItem('infaira_user', JSON.stringify({
  id: 1,
  username: 'InfAIra Admin',
  email: 'infaira.admin@infaira.com',
  role: 'Admin',
  avatar: 'https://ui-avatars.com/api/?name=InfAIra+Admin&background=3b82f6&color=fff',
  permissions: ['advisory', 'cvs', 'twin', 'command', 'sustain', 'ops']
}));
// Refresh the page
```

## Navigation

### Top Navigation Bar
- **Logo**: Click to return to home page
- **User Profile**: Click to see user details and logout option
- **Menu Icon** (mobile): Toggle sidebar on mobile devices

### Sidebar
- **Expand/Collapse**: Click the arrow button to toggle sidebar width
- **Navigation Items**: Click any solution to navigate (if you have permission)
- **Tooltips**: Hover over items when sidebar is collapsed to see names

## Features by Solution

### 1. InfAIra Advisory
- View 6 strategic consulting service cards
- Click any card to see detailed information in a modal
- Track progress and completion scores
- View deliverables and benefits

### 2. InfAIra CVS (Computer Vision)
- Filter solutions by category (All, Safety, Security, Analytics, Operations)
- Click any solution card to see detailed specifications
- View accuracy metrics and benefits
- See technical specifications in detail modal

### 3. InfAIra Twin (Digital Twin)
- **3D Interaction**: 
  - Left-click + drag to rotate the building
  - Right-click + drag to pan
  - Scroll to zoom in/out
  - Click sensor hotspots (colored spheres) to view data
- **View Modes**: Switch between Thermal, Occupancy, Energy, and Structural views
- **Side Panels**: Monitor real-time sensor data, system status, and alerts

### 4. InfAIra Command (Command Center)
- View 8 different monitoring widgets
- Click the expand icon (↗) on any widget to see full details
- Widgets auto-refresh with live data
- Monitor energy, security, facilities, sustainability, occupancy, assets, alerts, and environmental sensors

### 5. InfAIra Sustain (Sustainability)
- View hero metrics with animated counters
- Track Green Mark certification progress
- Analyze monthly trends with interactive charts
- Monitor sustainability goals progress
- View recent achievements and AI recommendations

### 6. InfAIra Ops (Operations)
- View cost savings dashboard
- Monitor work order status (Open, In Progress, Completed, Overdue)
- Review AFDD (Automated Fault Detection) alerts with root cause analysis
- Check upcoming maintenance calendar
- View asset portfolio health across categories
- See performance trends over 90 days
- Review optimization recommendations with impact scores

## Animations & Interactions

### Smooth Transitions
- Page transitions fade and slide
- Cards lift on hover
- Buttons scale on click
- Progress bars animate on load

### Micro-interactions
- Hover effects on all interactive elements
- Ripple effects on clicks
- Number counters animate
- Charts draw in smoothly

### Loading States
- Skeleton screens while loading
- Smooth content appearance
- Progressive loading

## Responsive Design

The dashboard is fully responsive:
- **Desktop**: Full sidebar with all features
- **Tablet**: Collapsible sidebar, adaptive grid layouts
- **Mobile**: Hamburger menu, single-column layouts, touch-friendly controls

## Keyboard Navigation

- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals and dropdowns

## Tips for Best Experience

1. **Use Chrome or Firefox** for best performance
2. **Enable hardware acceleration** for smooth 3D rendering
3. **Use a larger screen** to see all widgets simultaneously
4. **Try different user roles** to see permission-based access control
5. **Interact with charts** - hover to see detailed tooltips

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# The production build will be in the dist/ folder
```

## Customization

### Change Theme Colors
Edit `tailwind.config.js` to customize colors

### Add New Solutions
1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation item in `src/components/Sidebar.jsx`
4. Update permissions in `src/utils/mockData.js`

### Modify Mock Data
Edit `src/utils/mockData.js` to change:
- User profiles
- Metrics and statistics
- Chart data
- Alert messages
- Asset information

## Troubleshooting

### Port Already in Use
If port 3000 is busy, modify `webpack.config.js`:
```javascript
devServer: {
  port: 3001, // Change to any available port
  // ...
}
```

### Build Errors
Clear cache and reinstall:
```bash
rm -rf node_modules dist
npm install
npm run dev
```

### Browser Not Opening
Manually navigate to `http://localhost:3000`

## Performance Tips

- The initial bundle is large due to Three.js and Recharts
- In production, code splitting reduces initial load time
- Consider lazy loading pages for better performance
- Use the production build for deployment

## Browser Support

✅ Chrome (latest)
✅ Firefox (latest)  
✅ Safari (latest)
✅ Edge (latest)

## Next Steps

1. **Explore all 6 solutions** to see different features
2. **Test different user roles** to understand access control
3. **Interact with 3D model** in Digital Twin
4. **Expand widgets** in Command Center
5. **Review the code** to understand the architecture

Enjoy using InfAIra Dashboard! 🚀
