import { useState } from "react";

interface ImageUploaderProps {
    onImageUpload: (dataUrl: string) => void;
}

export const ImageUploader = ({ onImageUpload }: ImageUploaderProps) => {
    const [dragOver, setDragOver] = useState(false);
    const [imageData, setImageData] = useState<string | null>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImageData(result);
                onImageUpload(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleClick = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            const files = target.files;
            if (files && files.length > 0) {
                const file = files[0];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const result = reader.result as string;
                        setImageData(result);
                        onImageUpload(result);
                    };
                    reader.readAsDataURL(file);
                }
            } else {
                console.error("Файлы не найдены");
            }
        };
        input.click();
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            style={{
                border: `2px dashed ${dragOver ? '#00e' : '#aaa'}`,
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                marginBottom: '20px',
                position: 'relative'
            }}
        >
            {imageData ? (
                <img src={imageData} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            ) : (
                <p>Перетащите изображение сюда или нажмите для выбора файла</p>
            )}
        </div>
    );
};
