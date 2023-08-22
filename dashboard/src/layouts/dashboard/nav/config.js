// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'catalog',
    path: '/dashboard/catalog',
    icon: icon('ic_catalog'),
  },
  {
    title: 'prediction',
    path: '/dashboard/prediction',
    icon: icon('ic_prediction'),
  }, 
];

export default navConfig;
