import FileUploadWithPreview from '../components/FileUploadWithPreview';
import FileList from '../components/FileList';

export default function Home() {
  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: 32 }}>
      <h1>Upload your image</h1>
      <FileUploadWithPreview />
      <FileList />
    </main>
  );
}
