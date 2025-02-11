import { MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const ImagesSection = ({ attributes, setAttributes }) => {
    const { teamImage, consultationImage } = attributes;

    return (
        <div className="images-section">
            <div className="image-container team-image">
                <MediaUpload
                    onSelect={(media) => setAttributes({ teamImage: media })}
                    allowedTypes={['image']}
                    value={teamImage.id}
                    render={({ open }) => (
                        teamImage.url ? (
                            <div className="image-wrapper">
                                <img src={teamImage.url} alt={teamImage.alt} />
                                <Button
                                    onClick={open}
                                    className="change-image"
                                    variant="secondary"
                                >
                                    {__('Change Team Image', 'wondah-blocks')}
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={open}
                                className="upload-button"
                                variant="primary"
                            >
                                {__('Upload Team Image', 'wondah-blocks')}
                            </Button>
                        )
                    )}
                />
            </div>
            <div className="image-container consultation-image">
                <MediaUpload
                    onSelect={(media) => setAttributes({ consultationImage: media })}
                    allowedTypes={['image']}
                    value={consultationImage.id}
                    render={({ open }) => (
                        consultationImage.url ? (
                            <div className="image-wrapper">
                                <img src={consultationImage.url} alt={consultationImage.alt} />
                                <Button
                                    onClick={open}
                                    className="change-image"
                                    variant="secondary"
                                >
                                    {__('Change Consultation Image', 'wondah-blocks')}
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={open}
                                className="upload-button"
                                variant="primary"
                            >
                                {__('Upload Consultation Image', 'wondah-blocks')}
                            </Button>
                        )
                    )}
                />
            </div>
        </div>
    );
};

export const SaveImagesSection = ({ attributes }) => {
    const { teamImage, consultationImage } = attributes;

    return (
        <div className="images-section">
            {teamImage.url && (
                <div className="image-container team-image">
                    <img src={teamImage.url} alt={teamImage.alt} />
                </div>
            )}
            {consultationImage.url && (
                <div className="image-container consultation-image">
                    <img src={consultationImage.url} alt={consultationImage.alt} />
                </div>
            )}
        </div>
    );
};