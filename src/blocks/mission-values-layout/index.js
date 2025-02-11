import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, MediaUpload, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';

registerBlockType('wondah-blocks/mission-values-layout', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { mainImage, sectionTitle, items } = attributes;

        const updateItem = (index, updates) => {
            const newItems = [...items];
            newItems[index] = { ...newItems[index], ...updates };
            setAttributes({ items: newItems });
        };

        const addNewItem = () => {
            const newItems = [...items];
            const newNumber = (items.length + 1).toString().padStart(2, '0');
            newItems.push({
                number: newNumber,
                title: 'New Item',
                description: 'Enter description here...'
            });
            setAttributes({ items: newItems });
        };

        const removeItem = (index) => {
            const newItems = [...items];
            newItems.splice(index, 1);
            // Update remaining numbers
            newItems.forEach((item, idx) => {
                item.number = (idx + 1).toString().padStart(2, '0');
            });
            setAttributes({ items: newItems });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Image Settings', 'wondah-blocks')}>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ mainImage: media })}
                            allowedTypes={['image']}
                            value={mainImage?.id}
                            render={({ open }) => (
                                <Button
                                    onClick={open}
                                    variant="secondary"
                                >
                                    {mainImage?.url ? __('Change Image', 'wondah-blocks') : __('Add Image', 'wondah-blocks')}
                                </Button>
                            )}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps} className="mvl-block">
                    <div className="mvl-content">
                        <RichText
                            tagName="h2"
                            className="mvl-title"
                            value={sectionTitle}
                            onChange={(sectionTitle) => setAttributes({ sectionTitle })}
                            placeholder={__('Mission-Vision-Values', 'wondah-blocks')}
                        />
                        <div className="mvl-items">
                            {items.map((item, index) => (
                                <div key={index} className="mvl-item">
                                    <div className="mvl-item-number">{item.number}</div>
                                    <div className="mvl-item-content">
                                        <div className="mvl-item-header">
                                            <RichText
                                                tagName="h3"
                                                className="mvl-item-title"
                                                value={item.title}
                                                onChange={(title) => updateItem(index, { title })}
                                                placeholder={__('Item Title', 'wondah-blocks')}
                                            />
                                            <Button
                                                icon="no-alt"
                                                label={__('Remove Item', 'wondah-blocks')}
                                                onClick={() => removeItem(index)}
                                                className="mvl-remove-button"
                                            />
                                        </div>
                                        <RichText
                                            tagName="p"
                                            className="mvl-item-description"
                                            value={item.description}
                                            onChange={(description) => updateItem(index, { description })}
                                            placeholder={__('Item description...', 'wondah-blocks')}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="primary"
                            onClick={addNewItem}
                            className="mvl-add-button"
                        >
                            {__('Add New Item', 'wondah-blocks')}
                        </Button>
                    </div>
                    <div className="mvl-image-section">
                        {mainImage?.url ? (
                            <div className="mvl-image-wrapper">
                                <img src={mainImage.url} alt="" />
                                <div className="mvl-geometric-overlay"></div>
                            </div>
                        ) : (
                            <MediaUpload
                                onSelect={(media) => setAttributes({ mainImage: media })}
                                allowedTypes={['image']}
                                value={mainImage?.id}
                                render={({ open }) => (
                                    <Button
                                        onClick={open}
                                        variant="secondary"
                                        className="mvl-upload-button"
                                    >
                                        {__('Upload Image', 'wondah-blocks')}
                                    </Button>
                                )}
                            />
                        )}
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const { mainImage, sectionTitle, items } = attributes;

        return (
            <div className="mvl-block">
                <div className="mvl-content">
                    <RichText.Content
                        tagName="h2"
                        className="mvl-title"
                        value={sectionTitle}
                    />
                    <div className="mvl-items">
                        {items.map((item, index) => (
                            <div key={index} className="mvl-item">
                                <div className="mvl-item-number">{item.number}</div>
                                <div className="mvl-item-content">
                                    <RichText.Content
                                        tagName="h3"
                                        className="mvl-item-title"
                                        value={item.title}
                                    />
                                    <RichText.Content
                                        tagName="p"
                                        className="mvl-item-description"
                                        value={item.description}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mvl-image-section">
                    {mainImage?.url && (
                        <div className="mvl-image-wrapper">
                            <img src={mainImage.url} alt="" />
                            <div className="mvl-geometric-overlay"></div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
});