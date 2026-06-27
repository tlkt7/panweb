import { navContent } from './nav';

export const footerContent = {
  brand: {
    name: 'PANGEA',
    taglineLines: ['Горнорудный инжиниринг', 'и консалтинг полного цикла'],
  },
  pages: [
    { label: navContent.company.ru, path: '/about' },
    { label: navContent.resources.ru, path: '/resource-evaluation' },
    { label: navContent.mining.ru, path: '/mine-planning' },
    { label: navContent.laboratory.ru, path: '/laboratory' },
    { label: navContent.environmental.ru, path: '/environmental' },
    { label: navContent.projectDesign.ru, path: '/project-design' },
    { label: navContent.expertise.ru, path: '/permits' },
    { label: navContent.epcm.ru, path: '/commissioning' },
    { label: navContent.experience.ru, path: '/experience' },
  ],
  bottom: {
    copyright: '© 2026 Pangea PMG. Все права защищены',
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования',
    contacts: 'Контакты',
  },
};
