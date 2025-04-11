import "./components-css/createPostcardBtn.css";

type CreatePostcardBtnProps = {
    onClick: () => void;
};

export function CreatePostcardBtn({ onClick }: CreatePostcardBtnProps) {
    return (
        <button className="btn" onClick={onClick}>Create A Postcard</button>
    );
}