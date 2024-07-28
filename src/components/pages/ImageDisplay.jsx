    import React, { useEffect, useState } from 'react';

    function ImageDisplay() {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
        try {
            const response = await fetch('https://localhost:7207/api/v1/Images/%20?folderName=CustomIdentityUser&imageName=7323b249-df9d-47a9-a0c4-1dc31b104954.jpg', {
            });

            if (response.ok) {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.startsWith('image/')) {
                const blob = await response.blob();
                setImageSrc(URL.createObjectURL(blob));
            } else {
                console.error('Invalid content type:', contentType);
            }
            } else {
            console.error('Failed to fetch image:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching image:', error);
        }
        };

        fetchImage();
    }, []);

    return (
        <div>
        {imageSrc ? <img src={imageSrc} alt="Fetched from API" /> : <p>Loading...</p>}
        </div>
    );
    }

    export default ImageDisplay;
