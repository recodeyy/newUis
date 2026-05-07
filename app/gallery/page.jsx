import GalleryPage from '@/components/sections/Gallery';

export const metadata = {
  title: 'Gallery',
  description: 'Visual archive of selected work — engineered products, cinematic identities, and intelligent systems by Recodey.',
  openGraph: {
    title: 'Gallery | Recodey',
    description: 'Visual archive of selected work by Recodey — engineered products, cinematic identities, and intelligent systems.',
  },
};

export default function Gallery() {
  return <GalleryPage />;
}
