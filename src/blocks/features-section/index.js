import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, RangeControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';
import FeatureCard from './components/FeatureCard';

registerBlockType('wondah-blocks/features-section', {
    title: __('Features Section', 'wondah-blocks'),
    icon: 'grid-view',
    category: 'design',
    attributes: {
        title: {
            type: 'string',
            default: 'Our Features'
        },
        description: {
            type: 'string',
            default: 'Discover what makes us different'
        },
        titleColor: {
            type: 'string',
            default: '#1A1A1A'
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
        backgroundColor: {
            type: 'string',
            default: '#ffffff'
        },
        features: {
            type: 'array',
            default: [
                {
                    icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="#4F46E5"><path d="M16 2L4 7v9c0 5.55 3.84 10.74 12 13 8.16-2.26 12-7.45 12-13V7L16 2z"/></svg>',
                    title: 'Advanced Security',
                    description: 'State-of-the-art encryption and security measures to protect your data.'
                },
                {
                    icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="#4F46E5"><path d="M13 2L3 14h9l-1 16 10-12h-9l1-16z"/></svg>',
                    title: 'Lightning Fast',
                    description: 'Optimized performance for quick and efficient operations.'
                },
                {
                    icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="#4F46E5"><path d="M16 2c-7.72 0-14 6.28-14 14s6.28 14 14 14 14-6.28 14-14S23.72 2 16 2zm0 25c-6.08 0-11-4.92-11-11s4.92-11 11-11 11 4.92 11 11-4.92 11-11 11z"/></svg>',
                    title: '24/7 Support',
                    description: 'Round-the-clock customer support to assist you anytime.'
                }
            ]
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        const handleFeatureChange = (index, updatedFeature) => {
            const newFeatures = [...attributes.features];
            newFeatures[index] = updatedFeature;
            setAttributes({ features: newFeatures });
        };

        const removeFeature = (index) => {
            const newFeatures = [...attributes.features];
            newFeatures.splice(index, 1);
            setAttributes({ features: newFeatures });
        };

        const addNewFeature = () => {
            const newFeatures = [...attributes.features];
            newFeatures.push({
                icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="#4F46E5"><path d="M16 2c-7.72 0-14 6.28-14 14s6.28 14 14 14 14-6.28 14-14S23.72 2 16 2zm0 25c-6.08 0-11-4.92-11-11s4.92-11 11-11 11 4.92 11 11-4.92 11-11 11z"/></svg>',
                title: 'New Feature',
                description: 'Add your feature description here.'
            });
            setAttributes({ features: newFeatures });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Features Management', 'wondah-blocks')} initialOpen={true}>
                        <Button
                            variant="primary"
                            onClick={addNewFeature}
                            className="add-feature-button"
                            isSecondary
                            style={{ width: '100%', marginBottom: '16px' }}
                        >
                            {__('Add New Feature', 'wondah-blocks')}
                        </Button>
                        <RangeControl
                            label={__('Icon Size', 'wondah-blocks')}
                            value={attributes.globalIconSize}
                            onChange={(size) => setAttributes({ globalIconSize: size })}
                            min={16}
                            max={100}
                            step={10}
                        />
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
                    <PanelBody title={__('Features Background Settings', 'wondah-blocks')} initialOpen={false}>
                        <div className="color-settings">
                            <label>{__('Background Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.backgroundColor}
                                onChangeComplete={(color) => setAttributes({ backgroundColor: color.hex })}
                            />
                        </div>
                    </PanelBody>
                </InspectorControls>

                <div
                    {...blockProps}
                    className="features-section"
                    style={{
                        backgroundColor: attributes.backgroundColor || '#ffffff'
                    }}
                >
                    <div className="features-header">
                        <RichText
                            tagName="h2"
                            value={attributes.title}
                            onChange={(title) => setAttributes({ title })}
                            style={{
                                color: attributes.titleColor,
                                fontSize: `${attributes.titleFontSize}px`
                            }}
                            className="features-title"
                        />
                        <RichText
                            tagName="p"
                            value={attributes.description}
                            onChange={(description) => setAttributes({ description })}
                            style={{
                                color: attributes.descriptionColor,
                                fontSize: `${attributes.descriptionFontSize}px`
                            }}
                            className="features-description"
                        />
                    </div>
                    <div className="features-grid">
                        {attributes.features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                feature={feature}
                                index={index}
                                onChange={handleFeatureChange}
                                onRemove={removeFeature}
                                iconSize={attributes.globalIconSize}
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();

        return (
            <div
                {...blockProps}
                className="features-section"
                style={{
                    backgroundColor: attributes.backgroundColor || '#ffffff'
                }}
            >
                <div className="features-header">
                    <RichText.Content
                        tagName="h2"
                        value={attributes.title}
                        style={{
                            color: attributes.titleColor,
                            fontSize: `${attributes.titleFontSize}px`
                        }}
                        className="features-title"
                    />
                    <RichText.Content
                        tagName="p"
                        value={attributes.description}
                        style={{
                            color: attributes.descriptionColor,
                            fontSize: `${attributes.descriptionFontSize}px`
                        }}
                        className="features-description"
                    />
                </div>
                <div className="features-grid">
                    {attributes.features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            feature={feature}
                            index={index}
                            isEdit={false}
                            iconSize={attributes.globalIconSize}
                        />
                    ))}
                </div>
            </div>
        );
    }
});