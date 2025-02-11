import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ColorPicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';

const ALLOWED_BLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/image',
    'core/columns',
    'core/buttons',
    'wondah-blocks/vision-mission',
    'wondah-blocks/features-section',
    'wondah-blocks/goals-layout-one',
    'wondah-blocks/columns-block',
    'wondah-blocks/mission-values-layout',
    'wondah-blocks/therapy-hero'
];

import { createBlock } from '@wordpress/blocks';

registerBlockType('wondah-blocks/flex-container', {
    edit: ({ attributes, setAttributes, clientId }) => {
        const { columns, direction, containerWidth, columnLayout, backgroundColor } = attributes;

        const getColumnWidths = () => {
            const widths = columnLayout.split('-');
            return widths.map(width => `${width}%`);
        };

        // Create unique template keys for each column
        const TEMPLATE_KEYS = [...Array(columns)].map((_, index) => ({
            name: 'wondah-blocks/flex-column',
            innerBlocks: []
        }));

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Container Settings', 'wondah-blocks')}>
                        <RangeControl
                            label={__('Number of Columns', 'wondah-blocks')}
                            value={columns}
                            onChange={(value) => setAttributes({ columns: value })}
                            min={1}
                            max={4}
                        />
                        <SelectControl
                            label={__('Direction', 'wondah-blocks')}
                            value={direction}
                            options={[
                                { label: 'Horizontal', value: 'horizontal' },
                                { label: 'Vertical', value: 'vertical' }
                            ]}
                            onChange={(value) => setAttributes({ direction: value })}
                        />
                        <SelectControl
                            label={__('Container Width', 'wondah-blocks')}
                            value={containerWidth}
                            options={[
                                { label: 'Default (1200px)', value: '1200px' },
                                { label: 'Full Width', value: '100%' },
                                { label: 'Narrow (800px)', value: '800px' }
                            ]}
                            onChange={(value) => setAttributes({ containerWidth: value })}
                        />
                        <SelectControl
                            label={__('Column Layout', 'wondah-blocks')}
                            value={columnLayout}
                            options={[
                                { label: '50/50', value: '50-50' },
                                { label: '60/40', value: '60-40' },
                                { label: '70/30', value: '70-30' },
                                { label: '40/60', value: '40-60' },
                                { label: '30/70', value: '30-70' }
                            ]}
                            onChange={(value) => setAttributes({ columnLayout: value })}
                        />
                        <div className="flex-container-color-picker">
                            <label>{__('Background Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={backgroundColor}
                                onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
                            />
                        </div>
                    </PanelBody>
                </InspectorControls>

                <div {...useBlockProps()}>
                    <div 
                        className={`flex-container direction-${direction}`}
                        style={{ 
                            maxWidth: containerWidth,
                            backgroundColor: backgroundColor 
                        }}
                    >
                        {TEMPLATE_KEYS.map((_, index) => (
                            <div 
                                key={`column-${index}`}
                                className="flex-column"
                                style={{ 
                                    flex: `0 0 ${getColumnWidths()[index] || 'auto'}`
                                }}
                            >
                                <InnerBlocks
                                    allowedBlocks={ALLOWED_BLOCKS}
                                    templateLock={false}
                                    renderAppender={InnerBlocks.ButtonBlockAppender}
                                    template={[['core/paragraph']]}
                                    uniqueId={`column-${clientId}-${index}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const { columns, direction, containerWidth, columnLayout, backgroundColor } = attributes;

        const getColumnWidths = () => {
            const widths = columnLayout.split('-');
            return widths.map(width => `${width}%`);
        };

        return (
            <div {...useBlockProps.save()}>
                <div 
                    className={`flex-container direction-${direction}`}
                    style={{ 
                        maxWidth: containerWidth,
                        backgroundColor: backgroundColor 
                    }}
                >
                    {[...Array(columns)].map((_, index) => (
                        <div 
                            key={`column-${index}`}
                            className="flex-column"
                            style={{ 
                                flex: `0 0 ${getColumnWidths()[index] || 'auto'}`
                            }}
                        >
                            <InnerBlocks.Content />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
});