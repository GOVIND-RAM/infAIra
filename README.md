# InfAIra Dashboard

Modern, animated white-themed dashboard for InfAIra facility management solutions.

## Features

- **Modern UI**: Clean white theme with glass morphism effects and smooth animations
- **6 Solution Modules**:
  - InfAIra Advisory - Strategic consulting services
  - InfAIra CVS - Computer Vision Solutions
  - InfAIra Twin - Digital Twin with 3D visualization
  - InfAIra Command - Mission control dashboard
  - InfAIra Sustain - Sustainability analytics
  - InfAIra Ops - Operational intelligence
- **Role-Based Access Control**: Admin, FM Operations, and Viewer roles
- **Responsive Design**: Mobile-friendly with adaptive layouts
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **3D Visualization**: Three.js/React Three Fiber for Digital Twin
- **Data Visualizations**: Recharts for charts and graphs

## Tech Stack

- **React 18** - UI framework
- **Webpack 5** - Module bundler
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Three.js / React Three Fiber** - 3D rendering
- **Recharts** - Data visualization
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Production files will be in the `dist/` directory.

## Project Structure

```
infAIra/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── TopNav.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Layout.jsx
│   │   └── ErrorBoundary.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Advisory.jsx
│   │   ├── CVS.jsx
│   │   ├── Twin.jsx
│   │   ├── Command.jsx
│   │   ├── Sustain.jsx
│   │   └── Ops.jsx
│   ├── utils/
│   │   ├── mockData.js
│   │   └── AuthContext.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── index.js
├── webpack.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## User Roles & Permissions

### Admin
- Full access to all 6 solutions
- Username: John Admin

### FM Operations
- Access to: InfAIra Ops, InfAIra Command, InfAIra CVS
- Username: Sarah Operations

### Viewer
- Read-only access to: InfAIra Sustain, InfAIra Command
- Username: Mike Viewer

## Features by Solution

### InfAIra Advisory
- Service cards with progress tracking
- Modal overlays with detailed information
- Metrics and completion scores

### InfAIra CVS
- Filterable solution showcase
- Image/video previews
- Accuracy metrics and benefits
- Detailed specification modals

### InfAIra Twin
- Interactive 3D building model
- Real-time sensor data
- Multiple view modes (Thermal, Occupancy, Energy, Structural)
- System status monitoring

### InfAIra Command
- 8 widget dashboard
- Real-time metrics
- Expandable widgets
- Security, energy, and facility monitoring

### InfAIra Sustain
- ESG analytics
- Green Mark certification tracking
- Monthly trend charts
- Goal progress tracking
- AI recommendations

### InfAIra Ops
- Predictive maintenance calendar
- AFDD (Automated Fault Detection) alerts
- Asset portfolio overview
- Work order management
- Performance trends
- Cost savings calculator

## Customization

### Changing Colors

Edit `tailwind.config.js` to customize the color palette:

```js
theme: {
  extend: {
    colors: {
      primary: { ... },
      success: { ... },
      // Add your colors
    }
  }
}
```

### Adding New Solutions

1. Create a new page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation item in `src/components/Sidebar.jsx`
4. Update permissions in `src/utils/mockData.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions, please contact the InfAIra development team.
