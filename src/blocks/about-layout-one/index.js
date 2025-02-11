import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, ColorPicker, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';

registerBlockType('wondah-blocks/about-layout-one', {
    title: __('About Layout One', 'wondah-blocks'),
    icon: 'align-pull-right',
    category: 'design',
    attributes: {
        title: {
            type: 'string',
            default: 'Together We Are Strengthening Humanity'
        },
        description: {
            type: 'string',
            default: 'We\'ve been campaigning for a green and peaceful future for 40 years — and we\'re not stopping now. It\'s time to rise up like never before and fight for our climate and communities.'
        },
        buttonText: {
            type: 'string',
            default: 'Read About Us'
        },
        buttonUrl: {
            type: 'string',
            default: '#'
        },
        imageUrl: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number'
        },
        backgroundColor: {
            type: 'string',
            default: '#ffffff'
        },
        titleColor: {
            type: 'string',
            default: '#000000'
        },
        descriptionColor: {
            type: 'string',
            default: '#666666'
        },
        titleFontSize: {
            type: 'number',
            default: 48
        },
        descriptionFontSize: {
            type: 'number',
            default: 18
        },
        buttonBackgroundColor: {
            type: "string",
            default: "#E65525"
        },
        buttonTextColor: {
            type: "string",
            default: "#ffffff"
        }   
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        return (
            <>
                <InspectorControls>
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
                    <PanelBody title={__('Typography Settings', 'wondah-blocks')}>
                        <RangeControl
                            label={__('Title Font Size', 'wondah-blocks')}
                            value={attributes.titleFontSize}
                            onChange={(size) => setAttributes({ titleFontSize: size })}
                            min={16}
                            max={100}
                        />
                        <RangeControl
                            label={__('Description Font Size', 'wondah-blocks')}
                            value={attributes.descriptionFontSize}
                            onChange={(size) => setAttributes({ descriptionFontSize: size })}
                            min={12}
                            max={50}
                        />
                        <div className="color-settings">
                            <label>{__('Title Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.titleColor}
                                onChangeComplete={(color) => setAttributes({ titleColor: color.hex })}
                            />
                        </div>
                        <div className="color-settings">
                            <label>{__('Description Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.descriptionColor}
                                onChangeComplete={(color) => setAttributes({ descriptionColor: color.hex })}
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title={__('Background Settings', 'wondah-blocks')}>
                        <div className="color-settings">
                            <label>{__('Background Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.backgroundColor}
                                onChangeComplete={(color) => setAttributes({ backgroundColor: color.hex })}
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title={__('Button Settings', 'wondah-blocks')}>
                        <div className="url-input" style={{ marginBottom: '16px' }}>
                            <label>{__('Button URL', 'wondah-blocks')}</label>
                            <input
                                type="url"
                                value={attributes.buttonUrl}
                                onChange={(e) => setAttributes({ buttonUrl: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    marginTop: '8px'
                                }}
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


                </InspectorControls>

                <div {...blockProps} className="about-layout-one" style={{ backgroundColor: attributes.backgroundColor }}>
                    <div className="about-content">
                        <div className="text-content">
                            <RichText
                                tagName="h2"
                                value={attributes.title}
                                onChange={(title) => setAttributes({ title })}
                                style={{
                                    color: attributes.titleColor,
                                    fontSize: `${attributes.titleFontSize}px`
                                }}
                                className="about-title"
                            />
                            <RichText
                                tagName="p"
                                value={attributes.description}
                                onChange={(description) => setAttributes({ description })}
                                style={{
                                    color: attributes.descriptionColor,
                                    fontSize: `${attributes.descriptionFontSize}px`
                                }}
                                className="about-description"
                            />
                            <RichText
                                tagName="a"
                                value={attributes.buttonText}
                                onChange={(buttonText) => setAttributes({ buttonText })}
                                className="about-button"
                                style={{
                                    color: attributes.buttonTextColor,
                                    backgroundColor: attributes.buttonBackgroundColor
                                }}
                            />
                        </div>
                        <div className="image-content">
                            {attributes.imageUrl ? (
                                <img src={attributes.imageUrl} alt="" />
                            ) : (
                                <div className="placeholder">Select an image</div>
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
            <div {...blockProps} className="about-layout-one" style={{ backgroundColor: attributes.backgroundColor }}>
                <div className="about-content">
                    <div className="text-content">
                        <RichText.Content
                            tagName="h2"
                            value={attributes.title}
                            style={{
                                color: attributes.titleColor,
                                fontSize: `${attributes.titleFontSize}px`
                            }}
                            className="about-title"
                        />
                        <RichText.Content
                            tagName="p"
                            value={attributes.description}
                            style={{
                                color: attributes.descriptionColor,
                                fontSize: `${attributes.descriptionFontSize}px`
                            }}
                            className="about-description"
                        />
                        <RichText.Content
                            tagName="a"
                            value={attributes.buttonText}
                            className="about-button"
                            href={attributes.buttonUrl}
                            style={{
                                color: attributes.buttonTextColor,
                                backgroundColor: attributes.buttonBackgroundColor
                            }}
                        />
                    </div>
                    <div className="image-content">
                        {attributes.imageUrl && (
                            <img src={attributes.imageUrl} alt="" />
                        )}
                    </div>
                </div>
            </div>
        );
    }
});