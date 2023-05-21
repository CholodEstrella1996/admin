import { PeopleAltOutlined } from '@mui/icons-material'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import ScreenShareOutlinedIcon from '@mui/icons-material/ScreenShareOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined'

export const sections = [
  // Dashboard
  {
    title: '',
    pages: [
      {
        icon: DashboardOutlinedIcon,
        name: 'Dashboard',
        url: '/dashboard',
      },
    ],
  },
  // Accesos Directos
  {
    title: 'ACCESOS DIRECTOS',
    pages: [
      {
        icon: FolderOpenOutlinedIcon,
        name: 'Áreas, temáticas y apps',
        url: '/area',
        kind: 'area',
      },
      {
        icon: LibraryBooksOutlinedIcon,
        name: 'Currículos',
        url: '/country',
        kind: 'country',
      },
      {
        icon: BookmarkBorderOutlinedIcon,
        name: 'Editoriales',
        url: '/publisher',
        kind: 'publisher',
      },
      {
        icon: WidgetsOutlinedIcon,
        name: 'Paquetes',
        url: '/package',
        kind: 'packages',
      },
    ],
  },
  // Clientes
  {
    title: 'CLIENTES',
    pages: [
      {
        icon: PeopleAltOutlined,
        name: 'Todos los clientes',
        url: '/customer',
      },
    ],
  },
  // Suscripciones
  {
    title: 'SUSCRIPCIONES',
    pages: [
      {
        icon: MailOutlineIcon,
        name: 'Todas las suscripciones',
        url: '/subscription',
      },
      {
        icon: ScreenShareOutlinedIcon,
        name: 'Gestor de Aula',
        url: '/classroom',
      },
      {
        icon: CloudUploadOutlinedIcon,
        name: 'LMS/LTI',
        url: '/lms_lti',
      },
    ],
  },
  // Administración
  {
    title: 'ADMINISTRACIÓN',
    pages: [
      {
        icon: MailOutlineIcon,
        name: 'Anuncios',
        url: '/announcement',
      },
      {
        icon: PublicOutlinedIcon,
        name: 'Idiomas',
        url: '/languages',
      },
      {
        icon: PaidOutlinedIcon,
        name: 'Referencias de pago',
        url: '/payment_references',
      },
      {
        icon: PersonOutlineOutlinedIcon,
        name: 'Roles',
        url: '/role',
      },
      {
        icon: PeopleOutlineOutlinedIcon,
        name: 'Usuarios',
        url: '/users',
      },
    ],
  },
  // Configuración
  {
    title: 'CONFIGURACIÓN',
    pages: [
      {
        icon: SettingsOutlinedIcon,
        name: 'Demos',
        url: '/demo',
      },
      {
        icon: SettingsOutlinedIcon,
        name: 'Menú Cloudlabs',
        url: '/menu/1',
      },
      {
        icon: SettingsOutlinedIcon,
        name: 'Plantillas de e-mails',
        url: '/email_templates',
      },
      {
        icon: SettingsOutlinedIcon,
        name: 'Términos y condiciones',
        url: '/term_and_condition',
      },
    ],
  },
]

export const routesWithTreeMenu = {
  area: ['application', 'topic'],
  country: ['curriculum', 'subject', 'grade', 'grade_topic'],
  publisher: ['book', 'book_topic'],
}
