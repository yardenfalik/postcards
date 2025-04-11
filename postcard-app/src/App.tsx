import './App.css'
import { useState } from 'react';
import { CreatePostcardBtn } from './components/createPostcardBtn';
import { CreatePostcardMenu } from './components/createPostcardMenu';
import { PostcardProps } from './components/Postcard';
import { PostcardsCalendar } from './components/PostcardsCalendar';
import { ViewAllPostcards } from './components/viewallPostcards';

function savePostcardsToLocalStorage(postcards: PostcardProps[]) {
  localStorage.setItem('postcards', JSON.stringify(postcards));
}

function loadPostcardsFromLocalStorage(): PostcardProps[] {
  const postcards = localStorage.getItem('postcards');
  return postcards ? JSON.parse(postcards) : [];
}

function App() {
  const [postcards, setPostcards] = useState<PostcardProps[]>([]);

  const [loaded, setLoaded] = useState(false);
  if (!loaded) {
    const loadedPostcards = loadPostcardsFromLocalStorage();
    setPostcards(loadedPostcards);
    setLoaded(true);
    console.log(loadedPostcards);
  }

  const addPostcard = (newPostcard: PostcardProps) => {
    const index = postcards.length + 1;
    newPostcard.postcardIndex = index;
    setPostcards([...postcards, newPostcard]);
    setShowPostcardMenu(false);
    savePostcardsToLocalStorage([...postcards, newPostcard]);
  };

  const closeMenu = () => {
    setShowPostcardMenu(false);
  };

  const [showPostcardMenu, setShowPostcardMenu] = useState(false);
  const handleCreateBtnClick = () => {
    setShowPostcardMenu(!showPostcardMenu);
  };

  const[viewMode, setViewMode] = useState('all');
  const handleViewModeChange = (mode: string) => {
    setViewMode(mode);
  };

  const renderView = () => {
    if (viewMode === 'all') {
      return <ViewAllPostcards postcards={postcards} />;
    } else if (viewMode === 'calendar') {
      return <PostcardsCalendar postcards={postcards} />;
    }
  };

  return (
    <>
      {!showPostcardMenu ?
      <>
        <div className='navbar'>
          <a onClick={() => handleViewModeChange("all")} className={viewMode === "all" ? "active" : ""}>All</a>
          <a onClick={() => handleViewModeChange("calendar")} className={viewMode === "calendar" ? "active" : ""}>Calendar</a>
        </div>
        {renderView()}
        <CreatePostcardBtn onClick={handleCreateBtnClick} /> 
      </> : <CreatePostcardMenu onAdd={addPostcard} onClose={closeMenu} />}
    </>
  )
}

export default App