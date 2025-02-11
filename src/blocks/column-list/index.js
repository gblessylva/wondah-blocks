import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, IconButton, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import './style.scss';

registerBlockType(metadata.name, {
    ...metadata,
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { blockTitle, cards } = attributes;

        const updateCard = (index, updates) => {
            const newCards = [...cards];
            newCards[index] = { ...newCards[index], ...updates };
            setAttributes({ cards: newCards });
        };

        const addNewCard = () => {
            const newCards = [...cards];
            newCards.push({
                title: 'New Card',
                description: 'Enter description here...',
                icon: 'vision-icon'
            });
            setAttributes({ cards: newCards });
        };

        const removeCard = (index) => {
            const newCards = [...cards];
            newCards.splice(index, 1);
            setAttributes({ cards: newCards });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Block Settings', 'wondah-blocks')}>
                        {/* Add any additional controls here */}
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps} className="vision-mission-block">
                    <div className="background-section">
                        <InnerBlocks 
                            allowedBlocks={true} // Allows all block types
                            template={[
                                ['core/group', {}, [
                                    ['core/paragraph', { placeholder: 'Add blocks here...' }]
                                ]]
                            ]}
                        />
                    </div>
                    <div className="content-section">
                        <RichText
                            tagName="h2"
                            className="block-title"
                            value={blockTitle}
                            onChange={(blockTitle) => setAttributes({ blockTitle })}
                            placeholder={__('A two column with list', 'wondah-blocks')}
                        />
                        <div className="items-wrapper">
                            {cards.map((card, index) => (
                                <div key={index} className="item">
                                    <div className={`icon ${card.icon}`}></div>
                                    <div className="item-header">
                                        <RichText
                                            tagName="h3"
                                            value={card.title}
                                            onChange={(title) => updateCard(index, { title })}
                                            placeholder={__('Card Title', 'wondah-blocks')}
                                        />
                                        <IconButton
                                            icon="no-alt"
                                            label={__('Remove Card', 'wondah-blocks')}
                                            onClick={() => removeCard(index)}
                                            className="remove-card-button"
                                        />
                                    </div>
                                    <RichText
                                        tagName="p"
                                        value={card.description}
                                        onChange={(description) => updateCard(index, { description })}
                                        placeholder={__('Enter description...', 'wondah-blocks')}
                                    />
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="primary"
                            onClick={addNewCard}
                            className="add-card-button"
                        >
                            {__('Add New Card', 'wondah-blocks')}
                        </Button>
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const { blockTitle, cards } = attributes;

        return (
            <div className="vision-mission-block">
                <div className="background-section">
                    <InnerBlocks.Content />
                </div>
                <div className="content-section">
                    <RichText.Content
                        tagName="h2"
                        className="block-title"
                        value={blockTitle}
                    />
                    <div className="items-wrapper">
                        {cards.map((card, index) => (
                            <div key={index} className="item">
                                <div className={`icon ${card.icon}`}></div>
                                <RichText.Content tagName="h3" value={card.title} />
                                <RichText.Content tagName="p" value={card.description} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
});