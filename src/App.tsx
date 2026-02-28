import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlaybookProvider } from './contexts/PlaybookContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Landing from './components/layout/Landing';
import PlaybookLayout from './components/layout/PlaybookLayout';
import PlaybookIntro from './components/layout/PlaybookIntro';
import LessonRouter from './components/layout/LessonRouter';

export default function App() {
    return (
        <BrowserRouter>
            <LanguageProvider>
                <PlaybookProvider>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/playbook" element={<PlaybookLayout />}>
                            <Route index element={<PlaybookIntro />} />
                            <Route path=":sectionId/:lessonSlug" element={<LessonRouter />} />
                        </Route>
                    </Routes>
                </PlaybookProvider>
            </LanguageProvider>
        </BrowserRouter>
    );
}
