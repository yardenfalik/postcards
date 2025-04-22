import "./components-css/createPostcardMenu.css";
import { useEffect, useRef, useState } from "react";
import { PostcardProps } from "./Postcard";

type EditableFieldProps = {
    id: string;
    maxCharacters: number;
    initialText: string;
    className?: string;
};

function EditableField({ id, maxCharacters, initialText, className }: EditableFieldProps) {
    const editableRef = useRef<HTMLParagraphElement>(null);
    const [charactersLeft, setCharactersLeft] = useState(maxCharacters);
    const [text, setText] = useState(initialText);
    
    useEffect(() => {
        const el = editableRef.current;
        if (!el) return;
    
        el.textContent = initialText;
    
        const handleBeforeInput = (e: InputEvent) => {
          const length = el.textContent?.length || 0;
  
          if (e.inputType === "deleteContentBackward") {
            setCharactersLeft(maxCharacters - (length - 1));
            return;
          }
    
          if (length >= maxCharacters) {
            e.preventDefault(); // Prevent input if max characters reached
          } else {
            setCharactersLeft(maxCharacters - (length + 1));
          }
        };

        const handleInput = () => {
            const currentText = el?.textContent || "";
            setText(currentText);
        };

    
        el.addEventListener("beforeinput", handleBeforeInput as EventListener);
        el.addEventListener("input", handleInput);

        return () => {
          el.removeEventListener("beforeinput", handleBeforeInput as EventListener);
          el.removeEventListener("input", handleInput);
        };
      }, [maxCharacters, initialText]);
    
      useEffect(() => {
            setCharactersLeft(maxCharacters - initialText.length);
            setText(initialText);
        }, [initialText, maxCharacters]);
    
      return (
        <div className="editable-field">
          <p
            id={id}
            ref={editableRef}
            className={className}
            contentEditable
            suppressContentEditableWarning
            style={{color: text === initialText ? "#a9a9a9" : "black",}}
            >{text !== initialText ? "" : text}</p>
          <p className="char-counter">{charactersLeft}/{maxCharacters}</p>
        </div>
    );
}

type CreatePostcardMenuProps = {
    onAdd: (newPostcard: PostcardProps) => void;
    onClose: () => void;
};

export function CreatePostcardMenu({ onAdd, onClose }: CreatePostcardMenuProps) {
    const [previewSrc, setPreviewSrc] = useState("");

    const handleAddClick = () => {
        const title = document.getElementById("postcardTitle")?.textContent || "";
        const description = document.getElementById("postcardDescription")?.textContent || "";
        const location = document.getElementById("postcardLocation")?.textContent || "";

        const newPostcard: PostcardProps = {
            imageUrl: previewSrc,
            title: title,
            description: description,
            date: getCurrentDate(),
            location: location,
        };

        onAdd(newPostcard);
    }

    // Function to handle the image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = (e.target as FileReader).result;
                if (result) {
                    setPreviewSrc(result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const getCurrentDate = () => {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="create-postcard-menu">
            <h2>Create A Postcard</h2>
            <div className="create-postcard-menu-content">
                <input
                    type="file"
                    name="imageUploader"
                    id="imageUploader"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                />

                <div className="imagePreview">
                    {!previewSrc && (
                        <label htmlFor="imageUploader" className="imageUploaderContainer">
                            Upload An Image
                        </label>
                    )}

                    {previewSrc && (
                        <img src={previewSrc} id="previewImage" alt="Preview" />
                    )}
                </div>

                <div className="divider"></div>

                <div className="postcard-back-inputs">
                    <div className="postcard-text">
                        <EditableField
                            id="postcardTitle"
                            maxCharacters={25}
                            initialText="Postcard Title"
                            className="postcard-title"
                        />
                        <EditableField
                            id="postcardDescription"
                            maxCharacters={160}
                            initialText="Postcard description goes here. This is a sample text."
                        />
                    </div>
                    <div className="postcard-details-edit">
                        <p className="date">{getCurrentDate()}</p>
                        <div className="location">📍
                            <EditableField
                                id="postcardLocation"
                                maxCharacters={15}
                                initialText="Location"
                                className="postcard-location"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="controls">
                <a onClick={onClose}>Cancel</a>
                <a onClick={handleAddClick}>Save</a>
            </div>
        </div>
    );
}