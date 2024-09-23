import React, { useState } from 'react';

const DragAndDropImage = () => {
    const [image, setImage] = useState(null);

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
                border: '2px dashed #cccccc',
                padding: '20px',
                textAlign: 'center',
            }}
        >
            {image ? (
                <img src={image} alt="Uploaded" style={{ width: '100%', height: 'auto' }} />
            ) : (
                <p>Kéo thả hình ảnh vào đây hoặc chọn tệp tin</p>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: '10px' }} />
        </div>
    );
};

export default DragAndDropImage;
