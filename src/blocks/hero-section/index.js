import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, ColorPicker, RangeControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';
import CenterLayout from './components/CenterLayout';
import SideLayout from './components/SideLayout';
import SocialProof, { SaveContent as SocialProofSaveContent } from './components/SocialProof';
import { SaveContent as CenterSaveContent } from './components/CenterLayout';
import { SaveContent as SideSaveContent } from './components/SideLayout';


registerBlockType('wondah-blocks/hero-section', {
    title: __('Hero Section', 'wondah-blocks'),
    icon: 'cover-image',
    category: 'design',
    attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: 'h1'
        },
        description: {
            type: 'string',
            source: 'html',
            selector: 'p'
        },
        backgroundImage: {
            type: 'object',
            default: {}
        },
        titleColor: {
            type: 'string',
            default: '#ffffff'
        },
        descriptionColor: {
            type: 'string',
            default: '#ffffff'
        },
        titleFontSize: {
            type: 'number',
            default: 64
        },
        descriptionFontSize: {
            type: 'number',
            default: 24
        },
        primaryButtonText: {
            type: 'string',
            default: 'Start Now'
        },
        secondaryButtonText: {
            type: 'string',
            default: 'Explore Zenly'
        },
        primaryButtonBg: {
            type: 'string',
            default: '#9FE7F5'
        },
        primaryButtonColor: {
            type: 'string',
            default: '#1A1A1A'
        },
        secondaryButtonBg: {
            type: 'string',
            default: 'transparent'
        },
        secondaryButtonColor: {
            type: 'string',
            default: '#ffffff'
        },
        showPrimaryButton: {
            type: 'boolean',
            default: true
        },
        showSecondaryButton: {
            type: 'boolean',
            default: true
        },
        contentWidth: {
            type: 'number',
            default: 700
        },
        gradientColor1: {
            type: 'string',
            default: '#4F46E5'
        },
        gradientColor2: {
            type: 'string',
            default: '#9FE7F5'
        },
        overlayColor: {
            type: 'string',
            default: '#000000'
        },
        overlayOpacity: {
            type: 'number',
            default: 0.5
        },
        layout: {
            type: 'string',
            default: 'center' // center, left, right
        },
        sideImage: {
            type: 'object',
            default: {}
        },
        primaryButtonFontSize: {
            type: 'number',
            default: 16
        },
        secondaryButtonFontSize: {
            type: 'number',
            default: 16
        },
        primaryButtonPadding: {
            type: 'object',
            default: {
                vertical: 12,
                horizontal: 24
            }
        },
        secondaryButtonPadding: {
            type: 'object',
            default: {
                vertical: 12,
                horizontal: 24
            }
        },
        primaryButtonBorderRadius: {
            type: 'number',
            default: 0
        },
        secondaryButtonBorderRadius: {
            type: 'number',
            default: 0
        },
        socialProofItems: {
            type: 'array',
            source: 'query',
            selector: '.social-proof-item',
            default: [
                {
                    icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="#9FE7F5"><path d="M16 2L4 7v9c0 5.55 3.84 10.74 12 13 8.16-2.26 12-7.45 12-13V7L16 2z"/></svg>',
                    title: 'Secure Transfer',
                    description: 'ZenPay ensures your funds reach their destination instantly, with top-notch security.'
                },
                {
                    icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="#9FE7F5"><path d="M13 2L3 14h9l-1 16 10-12h-9l1-16z"/></svg>',
                    title: 'Seamless Integration',
                    description: 'Enjoy a streamlined financial experience, from business transactions to personal finance.'
                },
                {
                    icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="#9FE7F5"><path d="M16 2c-7.72 0-14 6.28-14 14s6.28 14 14 14 14-6.28 14-14S23.72 2 16 2zm0 25c-6.08 0-11-4.92-11-11s4.92-11 11-11 11 4.92 11 11-4.92 11-11 11z"/></svg>',
                    title: 'Multi-Currency Support',
                    description: 'Effortlessly transact in multiple currencies. ZenPay simplifies international payments.'
                }
            ],
            query: {
                icon: {
                    source: 'html',
                    selector: '.icon'
                },
                title: {
                    source: 'html',
                    selector: '.social-proof-title'
                },
                description: {
                    source: 'html',
                    selector: '.social-proof-description'
                }
            }
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const {
            title, description, backgroundImage, titleColor, descriptionColor,
            titleFontSize, descriptionFontSize, primaryButtonText, secondaryButtonText,
            primaryButtonBg, primaryButtonColor, secondaryButtonBg, secondaryButtonColor,
            contentWidth, gradientColor1, gradientColor2, overlayColor, overlayOpacity,
            layout,
            primaryButtonFontSize, secondaryButtonFontSize,
            primaryButtonPadding, secondaryButtonPadding,
            primaryButtonBorderRadius, secondaryButtonBorderRadius
        } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Layout Options', 'wondah-blocks')} initialOpen={true}>
                        <div className="layout-selector">
                            <label>{__('Select Layout', 'wondah-blocks')}</label>
                            <select
                                value={layout}
                                onChange={(e) => {
                                    setAttributes({ layout: e.target.value });
                                    // Force a re-render by updating a class on the block
                                    const blockElement = document.querySelector('.wp-block-wondah-blocks-hero-section');
                                    if (blockElement) {
                                        blockElement.className = `wp-block-wondah-blocks-hero-section hero-section layout-${e.target.value}`;
                                    }
                                }}
                                className="layout-select"
                            >
                                <option value="center">{__('Center Text (Default)', 'wondah-blocks')}</option>
                                <option value="left">{__('Text Left - Image Right', 'wondah-blocks')}</option>
                                <option value="right">{__('Text Right - Image Left', 'wondah-blocks')}</option>
                            </select>
                        </div>
                    </PanelBody>

                    <PanelBody title={__('Typography Settings', 'wondah-blocks')}>
                        <RangeControl
                            label={__('Title Font Size', 'wondah-blocks')}
                            value={titleFontSize}
                            onChange={(size) => setAttributes({ titleFontSize: size })}
                            min={16}
                            max={100}
                        />
                        <RangeControl
                            label={__('Mobile Title Font Size', 'wondah-blocks')}
                            value={attributes.titleFontSizeMobile}
                            onChange={(size) => setAttributes({ titleFontSizeMobile: size })}
                            min={16}
                            max={72}
                        />
                        <RangeControl
                            label={__('Mobile Description Font Size', 'wondah-blocks')}
                            value={attributes.descriptionFontSizeMobile}
                            onChange={(size) => setAttributes({ descriptionFontSizeMobile: size })}
                            min={12}
                            max={36}
                        />
                        <RangeControl
                            label={__('Description Font Size', 'wondah-blocks')}
                            value={descriptionFontSize}
                            onChange={(size) => setAttributes({ descriptionFontSize: size })}
                            min={12}
                            max={50}
                        />
                        <div className="color-settings">
                            <label>{__('Title Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={titleColor}
                                onChangeComplete={(color) => setAttributes({ titleColor: color.hex })}
                            />
                        </div>
                        <div className="color-settings">
                            <label>{__('Description Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={descriptionColor}
                                onChangeComplete={(color) => setAttributes({ descriptionColor: color.hex })}
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title={__('Button Settings', 'wondah-blocks')}>
                        <div className="button-settings">
                            <ToggleControl
                                label={__('Show Primary Button', 'wondah-blocks')}
                                checked={attributes.showPrimaryButton}
                                onChange={(value) => setAttributes({ showPrimaryButton: value })}
                            />
                            <ToggleControl
                                label={__('Show Secondary Button', 'wondah-blocks')}
                                checked={attributes.showSecondaryButton}
                                onChange={(value) => setAttributes({ showSecondaryButton: value })}
                            />
                            <label>{__('Primary Button Background', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={primaryButtonBg}
                                onChangeComplete={(color) => setAttributes({ primaryButtonBg: color.hex })}
                            />
                            <label>{__('Primary Button Text Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={primaryButtonColor}
                                onChangeComplete={(color) => setAttributes({ primaryButtonColor: color.hex })}
                            />
                        </div>
                        <div className="button-links">
                            <label>{__('Primary Button Link', 'wondah-blocks')}</label>
                            <input
                                type="url"
                                value={attributes.primaryButtonLink}
                                onChange={(e) => setAttributes({ primaryButtonLink: e.target.value })}
                                placeholder="https://"
                            />
                            <label>{__('Secondary Button Link', 'wondah-blocks')}</label>
                            <input
                                type="url"
                                value={attributes.secondaryButtonLink}
                                onChange={(e) => setAttributes({ secondaryButtonLink: e.target.value })}
                                placeholder="https://"
                            />
                        </div>
                        <div className="button-style-settings">
                            <h3>{__('Primary Button Styling', 'wondah-blocks')}</h3>
                            <RangeControl
                                label={__('Font Size', 'wondah-blocks')}
                                value={attributes.primaryButtonFontSize}
                                onChange={(size) => setAttributes({ primaryButtonFontSize: size })}
                                min={12}
                                max={32}
                            />
                            <RangeControl
                                label={__('Vertical Padding', 'wondah-blocks')}
                                value={attributes.primaryButtonPadding.vertical}
                                onChange={(padding) => setAttributes({ 
                                    primaryButtonPadding: {
                                        ...attributes.primaryButtonPadding,
                                        vertical: padding
                                    }
                                })}
                                min={0}
                                max={50}
                            />
                            <RangeControl
                                label={__('Horizontal Padding', 'wondah-blocks')}
                                value={attributes.primaryButtonPadding.horizontal}
                                onChange={(padding) => setAttributes({ 
                                    primaryButtonPadding: {
                                        ...attributes.primaryButtonPadding,
                                        horizontal: padding
                                    }
                                })}
                                min={0}
                                max={100}
                            />
                            <RangeControl
                                label={__('Border Radius', 'wondah-blocks')}
                                value={attributes.primaryButtonBorderRadius}
                                onChange={(radius) => setAttributes({ primaryButtonBorderRadius: radius })}
                                min={0}
                                max={50}
                            />

                            <h3>{__('Secondary Button Styling', 'wondah-blocks')}</h3>
                            <RangeControl
                                label={__('Font Size', 'wondah-blocks')}
                                value={attributes.secondaryButtonFontSize}
                                onChange={(size) => setAttributes({ secondaryButtonFontSize: size })}
                                min={12}
                                max={32}
                            />
                            <RangeControl
                                label={__('Vertical Padding', 'wondah-blocks')}
                                value={attributes.secondaryButtonPadding.vertical}
                                onChange={(padding) => setAttributes({ 
                                    secondaryButtonPadding: {
                                        ...attributes.secondaryButtonPadding,
                                        vertical: padding
                                    }
                                })}
                                min={0}
                                max={50}
                            />
                            <RangeControl
                                label={__('Horizontal Padding', 'wondah-blocks')}
                                value={attributes.secondaryButtonPadding.horizontal}
                                onChange={(padding) => setAttributes({ 
                                    secondaryButtonPadding: {
                                        ...attributes.secondaryButtonPadding,
                                        horizontal: padding
                                    }
                                })}
                                min={0}
                                max={100}
                            />
                            <RangeControl
                                label={__('Border Radius', 'wondah-blocks')}
                                value={attributes.secondaryButtonBorderRadius}
                                onChange={(radius) => setAttributes({ secondaryButtonBorderRadius: radius })}
                                min={0}
                                max={50}
                            />
                        </div>
                        <div className="button-settings">
                            <label>{__('Secondary Button Background', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={secondaryButtonBg}
                                onChangeComplete={(color) => setAttributes({ secondaryButtonBg: color.hex })}
                            />
                            <label>{__('Secondary Button Text Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={secondaryButtonColor}
                                onChangeComplete={(color) => setAttributes({ secondaryButtonColor: color.hex })}
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title={__('Layout Settings', 'wondah-blocks')}>
                        <RangeControl
                            label={__('Content Width', 'wondah-blocks')}
                            value={contentWidth}
                            onChange={(width) => setAttributes({ contentWidth: width })}
                            min={400}
                            max={1200}
                            step={10}
                        />
                    </PanelBody>

                    <PanelBody title={__('Heading Gradient', 'wondah-blocks')}>
                        <div className="gradient-controls">
                            <label>{__('Gradient Start Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={gradientColor1}
                                onChangeComplete={(color) => setAttributes({ gradientColor1: color.hex })}
                            />
                            <label>{__('Gradient End Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={gradientColor2}
                                onChangeComplete={(color) => setAttributes({ gradientColor2: color.hex })}
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title={__('Overlay Settings', 'wondah-blocks')}>
                        <div className="overlay-settings">
                            <label>{__('Overlay Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={overlayColor}
                                onChangeComplete={(color) => setAttributes({ overlayColor: color.hex })}
                            />
                            <RangeControl
                                label={__('Overlay Opacity', 'wondah-blocks')}
                                value={overlayOpacity}
                                onChange={(value) => setAttributes({ overlayOpacity: value })}
                                min={0}
                                max={1}
                                step={0.1}
                            />
                        </div>
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps} className={`hero-section layout-${layout}`} style={{
                    backgroundImage: backgroundImage.url ? `url(${backgroundImage.url})` : 'none',
                    '--overlay-color': overlayColor,
                    '--overlay-opacity': overlayOpacity
                }}>
                    <div className="hero-content" style={{
                        maxWidth: layout === 'center' ? `${contentWidth}px` : '100%'
                    }}>
                        {layout === 'center' ? (
                            <>
                                <CenterLayout attributes={attributes} setAttributes={setAttributes} />
                            </>
                        ) : (
                            <>
                                <SideLayout attributes={attributes} setAttributes={setAttributes} />

                            </>
                        )}
                        <MediaUpload
                            onSelect={(media) => setAttributes({ backgroundImage: media })}
                            allowedTypes={['image']}
                            value={backgroundImage.id}
                            render={({ open }) => (
                                <Button
                                    onClick={open}
                                    className="change-image-button"
                                >
                                    {backgroundImage.url ? __('Change Background', 'wondah-blocks') : __('Add Background', 'wondah-blocks')}
                                </Button>
                            )}
                        />

                    </div>

                </div >
            </>
        );
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
        const { layout, contentWidth, backgroundImage, overlayColor, overlayOpacity } = attributes;

        return (
            <div {...blockProps} className={`hero-section layout-${layout}`} style={{
                backgroundImage: backgroundImage.url ? `url(${backgroundImage.url})` : 'none',
                '--overlay-color': overlayColor,
                '--overlay-opacity': overlayOpacity
            }}>
                <div className="hero-content" style={{
                    maxWidth: layout === 'center' ? `${contentWidth}px` : '100%'
                }}>
                    {layout === 'center' ? (
                        <>
                            <CenterSaveContent attributes={attributes} />
                        </>
                    ) : (
                        <>
                            <SideSaveContent attributes={attributes} />
                        </>
                    )}
                    {/* <SocialProofSaveContent attributes={attributes} /> */}
                </div>

            </div>
        );
    }
});