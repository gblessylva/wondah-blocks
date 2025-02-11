import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';

registerBlockType('wondah-blocks/goals-layout-one', {
    title: __('Goals Layout One', 'wondah-blocks'),
    icon: 'grid-view',
    category: 'design',
    attributes: {
        tag: {
            type: 'string',
            default: 'Our Services'
        },
        title: {
            type: 'string',
            default: 'Unleash Your Potential'
        },
        description: {
            type: 'string',
            default: 'About Us section typically appears on a company or organization\'s website and provide visitors with key information about the entity. Here are the key points typically included:'
        },
        backgroundColor: {
            type: 'string',
            default: '#ffffff'
        },
        tagColor: {
            type: 'string',
            default: '#E65525'
        },
        tagBackgroundColor: {
            type: 'string',
            default: '#FFE4E0'
        },
        titleColor: {
            type: 'string',
            default: '#1A1A1A'
        },
        descriptionColor: {
            type: 'string',
            default: '#666666'
        },
        goals: {
            type: 'array',
            default: [
                {
                    icon: '📊',
                    title: 'Title Goes Here',
                    description: 'Holistic mental healthcare service for autistic and autism affected childs.',
                    link: '#'
                },
                {
                    icon: '🎯',
                    title: 'Title Goes Here',
                    description: 'Communicating what sets the company apart from competitors and visionary compass.',
                    link: '#'
                },
                {
                    icon: '💡',
                    title: 'Title Goes Here',
                    description: 'Communicating what sets the company apart from competitors and visionary compass.',
                    link: '#'
                },
                {
                    icon: '🚀',
                    title: 'Title Goes Here',
                    description: 'Communicating what sets the company apart from competitors and visionary compass.',
                    link: '#'
                }
            ]
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        const handleGoalChange = (index, field, value) => {
            const newGoals = [...attributes.goals];
            newGoals[index] = { ...newGoals[index], [field]: value };
            setAttributes({ goals: newGoals });
        };

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
                            <label>{__('Tag Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.tagColor}
                                onChangeComplete={(color) => setAttributes({ tagColor: color.hex })}
                            />
                        </div>
                        <div className="color-settings">
                            <label>{__('Tag Background Color', 'wondah-blocks')}</label>
                            <ColorPicker
                                color={attributes.tagBackgroundColor}
                                onChangeComplete={(color) => setAttributes({ tagBackgroundColor: color.hex })}
                            />
                        </div>
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
                    <PanelBody title={__('Goals Management', 'wondah-blocks')}>
                        <Button
                            variant="primary"
                            onClick={() => {
                                const newGoals = [...attributes.goals];
                                newGoals.push({
                                    icon: '🎯',
                                    title: 'New Goal',
                                    description: 'Add your goal description here.',
                                    link: '#'
                                });
                                setAttributes({ goals: newGoals });
                            }}
                            style={{ width: '100%', marginBottom: '16px' }}
                        >
                            {__('Add New Goal', 'wondah-blocks')}
                        </Button>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps} className="goals-layout-one" style={{ backgroundColor: attributes.backgroundColor }}>
                    <div className="goals-header">
                        <RichText
                            tagName="span"
                            value={attributes.tag}
                            onChange={(tag) => setAttributes({ tag })}
                            className="goals-tag"
                            style={{ 
                                color: attributes.tagColor,
                                backgroundColor: attributes.tagBackgroundColor
                            }}
                        />
                        <RichText
                            tagName="h2"
                            value={attributes.title}
                            onChange={(title) => setAttributes({ title })}
                            className="goals-title"
                            style={{ color: attributes.titleColor }}
                        />
                        <RichText
                            tagName="p"
                            value={attributes.description}
                            onChange={(description) => setAttributes({ description })}
                            className="goals-description"
                            style={{ color: attributes.descriptionColor }}
                        />
                    </div>
                    <div className="goals-grid">
                    {attributes.goals.map((goal, index) => (
                            <div key={index} className="goal-card">
                                <Button
                                    className="remove-goal"
                                    icon="no-alt"
                                    onClick={() => {
                                        const newGoals = [...attributes.goals];
                                        newGoals.splice(index, 1);
                                        setAttributes({ goals: newGoals });
                                    }}
                                />
                                <RichText
                                    tagName="span"
                                    value={goal.icon}
                                    onChange={(value) => handleGoalChange(index, 'icon', value)}
                                    className="goal-icon"
                                />
                                <RichText
                                    tagName="h3"
                                    value={goal.title}
                                    onChange={(value) => handleGoalChange(index, 'title', value)}
                                    className="goal-title"
                                    style={{ color: attributes.titleColor }}
                                />
                                <RichText
                                    tagName="p"
                                    value={goal.description}
                                    onChange={(value) => handleGoalChange(index, 'description', value)}
                                    className="goal-description"
                                    style={{ color: attributes.descriptionColor }}
                                />
                                <div className="goal-link">
                                    <RichText
                                        tagName="span"
                                        value="Read more →"
                                        className="read-more"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps} className="goals-layout-one" style={{ backgroundColor: attributes.backgroundColor }}>
                <div className="goals-header">
                    <RichText.Content
                        tagName="span"
                        value={attributes.tag}
                        className="goals-tag"
                        style={{ 
                            color: attributes.tagColor,
                            backgroundColor: attributes.tagBackgroundColor
                        }}
                    />
                    <RichText.Content
                        tagName="h2"
                        value={attributes.title}
                        className="goals-title"
                        style={{ color: attributes.titleColor }}
                    />
                    <RichText.Content
                        tagName="p"
                        value={attributes.description}
                        className="goals-description"
                        style={{ color: attributes.descriptionColor }}
                    />
                </div>
                <div className="goals-grid">
                    {attributes.goals.map((goal, index) => (
                        <div key={index} className="goal-card">
                            <RichText.Content
                                tagName="span"
                                value={goal.icon}
                                className="goal-icon"
                            />
                            <RichText.Content
                                tagName="h3"
                                value={goal.title}
                                className="goal-title"
                                style={{ color: attributes.titleColor }}
                            />
                            <RichText.Content
                                tagName="p"
                                value={goal.description}
                                className="goal-description"
                                style={{ color: attributes.descriptionColor }}
                            />
                            <div className="goal-link">
                                <a href={goal.link} className="read-more">
                                    Read more →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
});