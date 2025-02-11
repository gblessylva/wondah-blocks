import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, ColorPicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';

registerBlockType('wondah-blocks/about-layout-three', {
    title: __('About Layout Three', 'wondah-blocks'),
    icon: 'align-pull-right',
    category: 'design',
    attributes: {
        tag: {
            type: 'string',
            default: 'SUMMER PREVIEW'
        },
        title: {
            type: 'string',
            default: 'Say it loud'
        },
        description: {
            type: 'string',
            default: 'Shop the looks you love from social media. Find our customers styles and get inspired here.'
        },
        buttonText: {
            type: 'string',
            default: 'DISCOVER MORE'
        },
        buttonUrl: {
            type: 'string',
            default: '#'
        },
        backgroundColor: {
            type: 'string',
            default: '#FFE147'
        },
        textColor: {
            type: 'string',
            default: '#000000'
        },
        buttonBackgroundColor: {
            type: 'string',
            default: '#000000'
        },
        buttonTextColor: {
            type: 'string',
            default: '#FFFFFF'
        },
        imageUrl: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number'
        },
        textContentBackground: {
            type: 'string',
        },
        contentAlignment: {
            type: 'string',
            default: 'center'
        },
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Colors', 'wondah-blocks')}>
                        <div className="color-settings">
                            <label>{__('Background Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.backgroundColor}
                                onChangeComplete={(color) => setAttributes({ backgroundColor: color.hex })}
                            />
                        </div>
                        <div className="color-settings">
                            <label>{__('Text ContentBackground Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.textContentBackground}
                                onChangeComplete={(color) => setAttributes({ textContentBackground: color.hex })}
                            />
                        </div>
                        <div className="color-settings">
                            <label>{__('Text Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.textColor}
                                onChangeComplete={(color) => setAttributes({ textColor: color.hex })}
                            />
                        </div>
                        <div className="color-settings">
                            <label>{__('Button Background Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.buttonBackgroundColor}
                                onChangeComplete={(color) => setAttributes({ buttonBackgroundColor: color.hex })}
                            />
                        </div>
                        <div className="color-settings">
                            <label>{__('Button Text Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.buttonTextColor}
                                onChangeComplete={(color) => setAttributes({ buttonTextColor: color.hex })}
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title={__('Image Settings', 'wondah-blocks')}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => {
                                    setAttributes({
                                        imageUrl: media.url,
                                        imageId: media.id
                                    });
                                }}
                                allowedTypes={['image']}
                                value={attributes.imageId}
                                render={({ open }) => (
                                    <Button
                                        onClick={open}
                                        variant="secondary"
                                        style={{ width: '100%', marginBottom: '8px' }}
                                    >
                                        {attributes.imageUrl ? __('Replace Image', 'wondah-blocks') : __('Select Image', 'wondah-blocks')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    </PanelBody>
                    <PanelBody title={__('Layout Settings', 'wondah-blocks')}>
                        <div className="alignment-controls">
                            <label>{__('Content Alignment', 'wondah-blocks')}</label>
                            <div className="alignment-buttons">
                                <Button
                                    isPressed={attributes.contentAlignment === 'flex-start'}
                                    onClick={() => setAttributes({ contentAlignment: 'flex-start' })}
                                >
                                    Top
                                </Button>
                                <Button
                                    isPressed={attributes.contentAlignment === 'center'}
                                    onClick={() => setAttributes({ contentAlignment: 'center' })}
                                >
                                    Center
                                </Button>
                                <Button
                                    isPressed={attributes.contentAlignment === 'flex-end'}
                                    onClick={() => setAttributes({ contentAlignment: 'flex-end' })}
                                >
                                    Bottom
                                </Button>
                            </div>
                        </div>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps} className="about-layout-three" style={{ backgroundColor: attributes.backgroundColor }}>
                    <div className="about-content">
                        <div className="text-content"
                            style={{
                                backgroundColor: attributes.textContentBackground,
                                justifyContent: attributes.contentAlignment
                            }}>
                            <RichText
                                tagName="span"
                                value={attributes.tag}
                                onChange={(tag) => setAttributes({ tag })}
                                className="about-tag"
                                style={{ color: attributes.textColor }}
                            />
                            <RichText
                                tagName="h2"
                                value={attributes.title}
                                onChange={(title) => setAttributes({ title })}
                                className="about-title"
                                style={{ color: attributes.textColor }}
                            />
                            <RichText
                                tagName="p"
                                value={attributes.description}
                                onChange={(description) => setAttributes({ description })}
                                className="about-description"
                                style={{ color: attributes.textColor }}
                            />
                            <RichText
                                tagName="a"
                                value={attributes.buttonText}
                                onChange={(buttonText) => setAttributes({ buttonText })}
                                className="about-button"
                                style={{
                                    backgroundColor: attributes.buttonBackgroundColor,
                                    color: attributes.buttonTextColor
                                }}
                            />
                        </div>
                        <div className="image-content">
                            {attributes.imageUrl ? (
                                <img src={attributes.imageUrl} alt="" className="about-image" />
                            ) : (
                                <div className="image-placeholder">
                                    Select an image
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps} className="about-layout-three" style={{ backgroundColor: attributes.backgroundColor }}>
                <div className="about-content">
                    <div className="text-content"  style={{
                                backgroundColor: attributes.textContentBackground,
                                justifyContent: attributes.contentAlignment
                            }}>
                        <RichText.Content
                            tagName="span"
                            value={attributes.tag}
                            className="about-tag"
                            style={{ color: attributes.textColor }}
                        />
                        <RichText.Content
                            tagName="h2"
                            value={attributes.title}
                            className="about-title"
                            style={{ color: attributes.textColor }}
                        />
                        <RichText.Content
                            tagName="p"
                            value={attributes.description}
                            className="about-description"
                            style={{ color: attributes.textColor }}
                        />
                        <RichText.Content
                            tagName="a"
                            value={attributes.buttonText}
                            className="about-button"
                            href={attributes.buttonUrl}
                            style={{
                                backgroundColor: attributes.buttonBackgroundColor,
                                color: attributes.buttonTextColor
                            }}
                        />
                    </div>
                    <div className="image-content">
                        {attributes.imageUrl && (
                            <img src={attributes.imageUrl} alt="" className="about-image" />
                        )}
                    </div>
                </div>
            </div>
        );
    }
});