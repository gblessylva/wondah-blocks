import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export const Container = () => {
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
        'wondah-blocks/therapy-hero',
        
    ];

    const TEMPLATE = [
        ['core/heading', { level: 2, placeholder: __('Add heading...', 'wondah-blocks') }],
        ['core/paragraph', { placeholder: __('Add content or insert Wondah blocks...', 'wondah-blocks') }]
    ];

    return (
        <div className="ultimate-about-container">
            <InnerBlocks
                allowedBlocks={ALLOWED_BLOCKS}
                template={TEMPLATE}
                templateLock={false}
                renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
            />
        </div>
    );
};

export const SaveContainer = () => {
    return (
        <div className="ultimate-about-container">
            <InnerBlocks.Content />
        </div>
    );
};