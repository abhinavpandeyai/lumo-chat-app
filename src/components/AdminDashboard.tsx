import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Database, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Trash2, 
  Edit3,
  Folder,
  File,
  RefreshCw,
  ArrowLeft,
  BarChart3,
  Server,
  Activity,
  TrendingUp
} from 'lucide-react';

// Main container with proper scrolling
const AdminContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: #f8fafc;
`;

const AdminHeader = styled.div`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  flex-shrink: 0;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: white;
  color: #374151;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const AdminTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const AdminSubtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: ${props => props.theme.spacing.lg};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-color: #d1d5db;
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const StatIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.xl};
`;

const TabNavigation = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid #e2e8f0;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border: none;
  background: none;
  color: ${props => props.active ? '#3b82f6' : '#6b7280'};
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 0.875rem;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#3b82f6' : 'transparent'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};

  &:hover {
    color: #3b82f6;
  }
`;

const SectionContainer = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: ${props => props.theme.spacing.md};
  text-align: left;
  border-bottom: 2px solid #e2e8f0;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f9fafb;
  }
`;

const TableCell = styled.td`
  padding: ${props => props.theme.spacing.md};
  color: #374151;
  font-size: 0.875rem;
`;

const StatusBadge = styled.span<{ status: 'success' | 'error' | 'warning' | 'info' }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => {
    switch (props.status) {
      case 'success':
        return `
          background: #dcfce7;
          color: #166534;
        `;
      case 'error':
        return `
          background: #fee2e2;
          color: #dc2626;
        `;
      case 'warning':
        return `
          background: #fef3c7;
          color: #d97706;
        `;
      case 'info':
        return `
          background: #dbeafe;
          color: #2563eb;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #374151;
        `;
    }
  }}
`;

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

const BreadcrumbItem = styled.span<{ clickable?: boolean }>`
  color: ${props => props.clickable ? '#3b82f6' : '#6b7280'};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  font-size: 0.875rem;
  font-weight: ${props => props.clickable ? '500' : '400'};
  
  &:hover {
    color: ${props => props.clickable ? '#2563eb' : '#6b7280'};
  }
`;

const BreadcrumbSeparator = styled.span`
  color: #9ca3af;
  font-size: 0.875rem;
`;

const InteractiveTableRow = styled(TableRow)<{ isFolder?: boolean }>`
  cursor: ${props => props.isFolder ? 'pointer' : 'default'};
  
  &:hover {
    background-color: ${props => props.isFolder ? '#f0f9ff' : '#f9fafb'};
  }
`;

const FileNameContainer = styled.div<{ isFolder?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  ${props => props.isFolder && `
    &:hover {
      background-color: #dbeafe;
    }
  `}
`;

const NavigationBackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: white;
  color: #374151;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface SharePointSite {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
  lastSync: Date;
}

interface FileData {
  id: string;
  name: string;
  path: string;
  type: 'folder' | 'file';
  lastModified: Date;
  size: string;
  children?: FileData[];
  parentPath?: string;
}

interface SyncRecord {
  id: string;
  timestamp: Date;
  status: 'success' | 'error' | 'warning';
  filesProcessed: number;
  duration: string;
  error?: string;
}

interface UserAccess {
  id: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
  lastLogin: Date;
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'sharepoint' | 'files' | 'users'>('overview');
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [pathHistory, setPathHistory] = useState<string[]>(['/']);

  const handleBackToChat = () => {
    navigate('/');
  };

  // Mock data
  const stats = {
    totalSites: 2,
    totalFiles: 1247,
    lastSync: '2 hours ago',
    activeUsers: 89
  };

  const sharepointSites: SharePointSite[] = [
    {
      id: '1',
      name: 'Main Corporate Site',
      url: 'https://pcsoft.sharepoint.com/sites/main',
      isActive: true,
      lastSync: new Date('2025-09-16T10:30:00')
    },
    {
      id: '2',
      name: 'Help Engine',
      url: 'https://pcsoft.sharepoint.com/sites/help-engine',
      isActive: true,
      lastSync: new Date('2025-09-16T09:15:00')
    }
  ];

  const fileSystemData: FileData[] = [
    {
      id: '1',
      name: 'Documents',
      path: '/Documents',
      type: 'folder',
      lastModified: new Date('2025-09-15T14:30:00'),
      size: '--',
      children: [
        {
          id: '1-1',
          name: 'Q4 Report.pdf',
          path: '/Documents/Q4 Report.pdf',
          type: 'file',
          lastModified: new Date('2025-09-14T11:20:00'),
          size: '2.4 MB',
          parentPath: '/Documents'
        },
        {
          id: '1-2',
          name: 'Company Policy.docx',
          path: '/Documents/Company Policy.docx',
          type: 'file',
          lastModified: new Date('2025-09-12T09:15:00'),
          size: '856 KB',
          parentPath: '/Documents'
        },
        {
          id: '1-3',
          name: 'Templates',
          path: '/Documents/Templates',
          type: 'folder',
          lastModified: new Date('2025-09-10T16:45:00'),
          size: '--',
          parentPath: '/Documents',
          children: [
            {
              id: '1-3-1',
              name: 'Invoice Template.xlsx',
              path: '/Documents/Templates/Invoice Template.xlsx',
              type: 'file',
              lastModified: new Date('2025-09-08T14:20:00'),
              size: '125 KB',
              parentPath: '/Documents/Templates'
            },
            {
              id: '1-3-2',
              name: 'Letter Template.docx',
              path: '/Documents/Templates/Letter Template.docx',
              type: 'file',
              lastModified: new Date('2025-09-07T11:30:00'),
              size: '78 KB',
              parentPath: '/Documents/Templates'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Help Engine',
      path: '/Help Engine',
      type: 'folder',
      lastModified: new Date('2025-09-16T08:45:00'),
      size: '--',
      children: [
        {
          id: '2-1',
          name: 'User Guides',
          path: '/Help Engine/User Guides',
          type: 'folder',
          lastModified: new Date('2025-09-16T08:45:00'),
          size: '--',
          parentPath: '/Help Engine',
          children: [
            {
              id: '2-1-1',
              name: 'Getting Started.pdf',
              path: '/Help Engine/User Guides/Getting Started.pdf',
              type: 'file',
              lastModified: new Date('2025-09-15T10:20:00'),
              size: '1.8 MB',
              parentPath: '/Help Engine/User Guides'
            },
            {
              id: '2-1-2',
              name: 'Advanced Features.pdf',
              path: '/Help Engine/User Guides/Advanced Features.pdf',
              type: 'file',
              lastModified: new Date('2025-09-14T15:30:00'),
              size: '3.2 MB',
              parentPath: '/Help Engine/User Guides'
            }
          ]
        },
        {
          id: '2-2',
          name: 'FAQs.docx',
          path: '/Help Engine/FAQs.docx',
          type: 'file',
          lastModified: new Date('2025-09-13T16:45:00'),
          size: '892 KB',
          parentPath: '/Help Engine'
        },
        {
          id: '2-3',
          name: 'Troubleshooting.pdf',
          path: '/Help Engine/Troubleshooting.pdf',
          type: 'file',
          lastModified: new Date('2025-09-12T12:15:00'),
          size: '1.5 MB',
          parentPath: '/Help Engine'
        }
      ]
    },
    {
      id: '3',
      name: 'Projects',
      path: '/Projects',
      type: 'folder',
      lastModified: new Date('2025-09-11T14:20:00'),
      size: '--',
      children: [
        {
          id: '3-1',
          name: 'Project Alpha',
          path: '/Projects/Project Alpha',
          type: 'folder',
          lastModified: new Date('2025-09-11T14:20:00'),
          size: '--',
          parentPath: '/Projects',
          children: [
            {
              id: '3-1-1',
              name: 'Requirements.docx',
              path: '/Projects/Project Alpha/Requirements.docx',
              type: 'file',
              lastModified: new Date('2025-09-10T09:30:00'),
              size: '445 KB',
              parentPath: '/Projects/Project Alpha'
            },
            {
              id: '3-1-2',
              name: 'Design.pptx',
              path: '/Projects/Project Alpha/Design.pptx',
              type: 'file',
              lastModified: new Date('2025-09-09T16:20:00'),
              size: '6.7 MB',
              parentPath: '/Projects/Project Alpha'
            }
          ]
        },
        {
          id: '3-2',
          name: 'Project Beta.zip',
          path: '/Projects/Project Beta.zip',
          type: 'file',
          lastModified: new Date('2025-09-08T13:45:00'),
          size: '12.3 MB',
          parentPath: '/Projects'
        }
      ]
    },
    {
      id: '4',
      name: 'Reports.xlsx',
      path: '/Reports.xlsx',
      type: 'file',
      lastModified: new Date('2025-09-16T12:30:00'),
      size: '3.1 MB'
    }
  ];

  // Helper functions for file navigation
  const findItemByPath = (items: FileData[], targetPath: string): FileData | null => {
    for (const item of items) {
      if (item.path === targetPath) {
        return item;
      }
      if (item.children) {
        const found = findItemByPath(item.children, targetPath);
        if (found) return found;
      }
    }
    return null;
  };

  const getCurrentItems = (): FileData[] => {
    if (currentPath === '/') {
      return fileSystemData;
    }
    const currentFolder = findItemByPath(fileSystemData, currentPath);
    return currentFolder?.children || [];
  };

  const navigateToFolder = (folderPath: string) => {
    setCurrentPath(folderPath);
    setPathHistory(prev => [...prev, folderPath]);
  };

  const navigateBack = () => {
    if (pathHistory.length > 1) {
      const newHistory = pathHistory.slice(0, -1);
      const previousPath = newHistory[newHistory.length - 1];
      setPathHistory(newHistory);
      setCurrentPath(previousPath);
    }
  };

  const getBreadcrumbs = () => {
    if (currentPath === '/') return ['Root'];
    const parts = currentPath.split('/').filter(Boolean);
    return ['Root', ...parts];
  };

  const syncRecords: SyncRecord[] = [
    {
      id: '1',
      timestamp: new Date('2025-09-16T10:30:00'),
      status: 'success',
      filesProcessed: 1247,
      duration: '45 minutes'
    },
    {
      id: '2',
      timestamp: new Date('2025-09-16T06:00:00'),
      status: 'success',
      filesProcessed: 892,
      duration: '38 minutes'
    },
    {
      id: '3',
      timestamp: new Date('2025-09-15T18:00:00'),
      status: 'error',
      filesProcessed: 0,
      duration: 'Failed after 10 minutes',
      error: 'Connection timeout'
    }
  ];

  const userAccess: UserAccess[] = [
    {
      id: '1',
      email: 'priya.sharma@pcsoft.com',
      role: 'admin',
      isActive: true,
      lastLogin: new Date('2025-09-16T08:30:00')
    },
    {
      id: '2',
      email: 'rahul.gupta@pcsoft.com',
      role: 'user',
      isActive: true,
      lastLogin: new Date('2025-09-15T16:45:00')
    },
    {
      id: '3',
      email: 'kavya.patel@pcsoft.com',
      role: 'user',
      isActive: false,
      lastLogin: new Date('2025-09-10T14:20:00')
    }
  ];

  const renderOverview = () => (
    <>
      <StatsGrid>
        <StatCard>
          <StatHeader>
            <StatIcon color="#3b82f6">
              <Server size={20} />
            </StatIcon>
          </StatHeader>
          <StatValue>{stats.totalSites}</StatValue>
          <StatLabel>Connected Sites</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatHeader>
            <StatIcon color="#10b981">
              <File size={20} />
            </StatIcon>
          </StatHeader>
          <StatValue>{stats.totalFiles.toLocaleString()}</StatValue>
          <StatLabel>Files Vectorized</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatHeader>
            <StatIcon color="#f59e0b">
              <Activity size={20} />
            </StatIcon>
          </StatHeader>
          <StatValue>{stats.lastSync}</StatValue>
          <StatLabel>Last Sync</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatHeader>
            <StatIcon color="#8b5cf6">
              <Users size={20} />
            </StatIcon>
          </StatHeader>
          <StatValue>{stats.activeUsers}</StatValue>
          <StatLabel>Active Users</StatLabel>
        </StatCard>
      </StatsGrid>

      <SectionContainer>
        <SectionHeader>
          <SectionTitle>
            <TrendingUp size={20} />
            Recent Activity
          </SectionTitle>
        </SectionHeader>
        <Table>
          <thead>
            <tr>
              <TableHeader>Activity</TableHeader>
              <TableHeader>User</TableHeader>
              <TableHeader>Time</TableHeader>
              <TableHeader>Status</TableHeader>
            </tr>
          </thead>
          <tbody>
            <TableRow>
              <TableCell>SharePoint sync completed</TableCell>
              <TableCell>System</TableCell>
              <TableCell>2 hours ago</TableCell>
              <TableCell><StatusBadge status="success"><CheckCircle size={12} />Success</StatusBadge></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>New user added</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>4 hours ago</TableCell>
              <TableCell><StatusBadge status="info"><Users size={12} />Info</StatusBadge></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>File vectorization started</TableCell>
              <TableCell>System</TableCell>
              <TableCell>6 hours ago</TableCell>
              <TableCell><StatusBadge status="warning"><Clock size={12} />In Progress</StatusBadge></TableCell>
            </TableRow>
          </tbody>
        </Table>
      </SectionContainer>
    </>
  );

  const renderSharePointSites = () => (
    <>
      <SectionContainer>
        <SectionHeader>
          <SectionTitle>
            <Database size={20} />
            SharePoint Sites
          </SectionTitle>
          <ActionButton>
            <Plus size={16} />
            Add Site
          </ActionButton>
        </SectionHeader>
        <Table>
          <thead>
            <tr>
              <TableHeader>Site Name</TableHeader>
              <TableHeader>URL</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Last Sync</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {sharepointSites.map(site => (
              <TableRow key={site.id}>
                <TableCell>{site.name}</TableCell>
                <TableCell>{site.url}</TableCell>
                <TableCell>
                  <StatusBadge status={site.isActive ? 'success' : 'error'}>
                    {site.isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {site.isActive ? 'Connected' : 'Error'}
                  </StatusBadge>
                </TableCell>
                <TableCell>{site.isActive ? site.lastSync.toLocaleString() : 'Failed'}</TableCell>
                <TableCell>
                  <ActionButton>
                    <RefreshCw size={14} />
                    {site.isActive ? 'Sync' : 'Configure'}
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </SectionContainer>

      <SectionContainer>
        <SectionHeader>
          <SectionTitle>
            <Calendar size={20} />
            Sync Schedule
          </SectionTitle>
          <ActionButton>
            <Edit3 size={16} />
            Modify Schedule
          </ActionButton>
        </SectionHeader>
        <Table>
          <thead>
            <tr>
              <TableHeader>Schedule Name</TableHeader>
              <TableHeader>Frequency</TableHeader>
              <TableHeader>Next Run</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            <TableRow>
              <TableCell>Daily Full Sync</TableCell>
              <TableCell>Every day at 2:00 AM</TableCell>
              <TableCell>Tomorrow 2:00 AM</TableCell>
              <TableCell><StatusBadge status="success"><CheckCircle size={12} />Active</StatusBadge></TableCell>
              <TableCell>
                <ActionButton>
                  <Edit3 size={14} />
                  Edit
                </ActionButton>
              </TableCell>
            </TableRow>
          </tbody>
        </Table>
      </SectionContainer>

      <SectionContainer>
        <SectionHeader>
          <SectionTitle>
            <Clock size={20} />
            Sync History
          </SectionTitle>
        </SectionHeader>
        <Table>
          <thead>
            <tr>
              <TableHeader>Start Time</TableHeader>
              <TableHeader>Duration</TableHeader>
              <TableHeader>Files Processed</TableHeader>
              <TableHeader>Status</TableHeader>
            </tr>
          </thead>
          <tbody>
            {syncRecords.map(record => (
              <TableRow key={record.id}>
                <TableCell>{record.timestamp.toLocaleString()}</TableCell>
                <TableCell>{record.duration}</TableCell>
                <TableCell>{record.filesProcessed.toLocaleString()} files</TableCell>
                <TableCell>
                  <StatusBadge status={record.status}>
                    {record.status === 'success' && <CheckCircle size={12} />}
                    {record.status === 'error' && <XCircle size={12} />}
                    {record.status === 'warning' && <Clock size={12} />}
                    {record.status === 'success' ? 'Completed' : record.status === 'error' ? 'Failed' : 'In Progress'}
                  </StatusBadge>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </SectionContainer>
    </>
  );

  const renderFilesAndFolders = () => {
    const currentItems = getCurrentItems();
    const breadcrumbs = getBreadcrumbs();
    
    return (
      <SectionContainer>
        <SectionHeader>
          <SectionTitle>
            <Folder size={20} />
            Files & Folders
          </SectionTitle>
          {currentPath !== '/' && (
            <NavigationBackButton onClick={navigateBack} disabled={pathHistory.length <= 1}>
              <ArrowLeft size={16} />
              Back
            </NavigationBackButton>
          )}
        </SectionHeader>
        
        <BreadcrumbContainer>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
              <BreadcrumbItem 
                clickable={index < breadcrumbs.length - 1}
                onClick={() => {
                  if (index < breadcrumbs.length - 1) {
                    const targetPath = index === 0 ? '/' : '/' + breadcrumbs.slice(1, index + 1).join('/');
                    setCurrentPath(targetPath);
                    setPathHistory(pathHistory.slice(0, index + 1));
                  }
                }}
              >
                {crumb}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbContainer>
        
        <Table>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Size</TableHeader>
              <TableHeader>Modified</TableHeader>
              <TableHeader>Source</TableHeader>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(file => (
              <InteractiveTableRow 
                key={file.id} 
                isFolder={file.type === 'folder'}
                onDoubleClick={() => {
                  if (file.type === 'folder') {
                    navigateToFolder(file.path);
                  }
                }}
              >
                <TableCell>
                  <FileNameContainer isFolder={file.type === 'folder'}>
                    {file.type === 'folder' ? 
                      <Folder size={16} color="#3b82f6" /> : 
                      <File size={16} color="#10b981" />
                    }
                    {file.name}
                    {file.type === 'folder' && file.children && (
                      <span style={{ color: '#6b7280', fontSize: '0.75rem', marginLeft: '4px' }}>
                        ({file.children.length} items)
                      </span>
                    )}
                  </FileNameContainer>
                </TableCell>
                <TableCell style={{ textTransform: 'capitalize' }}>{file.type}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>{file.lastModified.toLocaleDateString()}</TableCell>
                <TableCell>
                  {file.path.startsWith('/Help Engine') ? 'Help Engine' : 
                   file.path.startsWith('/Documents') ? 'Main Corporate Site' : 
                   'Main Corporate Site'}
                </TableCell>
              </InteractiveTableRow>
            ))}
            {currentItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                  This folder is empty
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
      </SectionContainer>
    );
  };

  const renderUserManagement = () => (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>
          <Users size={20} />
          User Access Management
        </SectionTitle>
        <ActionButton>
          <Plus size={16} />
          Add User
        </ActionButton>
      </SectionHeader>
      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Last Active</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {userAccess.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell style={{ textTransform: 'capitalize' }}>{user.role}</TableCell>
              <TableCell>{user.lastLogin.toLocaleDateString()}</TableCell>
              <TableCell>
                <StatusBadge status={user.isActive ? 'success' : 'warning'}>
                  {user.isActive ? <CheckCircle size={12} /> : <Clock size={12} />}
                  {user.isActive ? 'Active' : 'Inactive'}
                </StatusBadge>
              </TableCell>
              <TableCell>
                <ActionButton>
                  <Edit3 size={14} />
                  Edit
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </SectionContainer>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'sharepoint':
        return renderSharePointSites();
      case 'files':
        return renderFilesAndFolders();
      case 'users':
        return renderUserManagement();
      default:
        return renderOverview();
    }
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <HeaderTop>
          <BackButton onClick={handleBackToChat}>
            <ArrowLeft size={16} />
            Back to Chat
          </BackButton>
        </HeaderTop>
        <HeaderContent>
          <AdminTitle>Admin Dashboard</AdminTitle>
          <AdminSubtitle>Manage SharePoint connections, data sync, and user access</AdminSubtitle>
        </HeaderContent>
      </AdminHeader>

      <ScrollableContent>
        <TabNavigation>
          <TabButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 size={16} />
            Overview
          </TabButton>
          <TabButton
            active={activeTab === 'sharepoint'}
            onClick={() => setActiveTab('sharepoint')}
          >
            <Database size={16} />
            SharePoint Sites
          </TabButton>
          <TabButton
            active={activeTab === 'files'}
            onClick={() => setActiveTab('files')}
          >
            <Folder size={16} />
            Files & Folders
          </TabButton>
          <TabButton
            active={activeTab === 'users'}
            onClick={() => setActiveTab('users')}
          >
            <Users size={16} />
            User Management
          </TabButton>
        </TabNavigation>

        {renderContent()}
      </ScrollableContent>
    </AdminContainer>
  );
};
