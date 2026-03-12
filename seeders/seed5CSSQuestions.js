require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const cssQuestions = [
  {
    title: 'CSS Selectors & Basic Styling',
    problemStatement: 'Create a styled webpage using various CSS selectors including element selectors, class selectors, ID selectors, and attribute selectors. Apply colors, fonts, and spacing to demonstrate proper CSS styling techniques.',
    requirements: [
      'Create a <style> tag in the head section',
      'Use element selectors to style h1, h2, p tags',
      'Create and apply at least 3 CSS classes with different styles',
      'Use ID selector to style a specific element',
      'Apply color properties (background-color, color)',
      'Set font properties (font-size, font-family, font-weight)',
      'Add margin and padding to elements',
      'Use attribute selectors for input elements',
      'Apply text-align and text-decoration properties',
      'Ensure proper CSS syntax and specificity'
    ],
    acceptanceCriteria: [
      'Style tag exists in head',
      'Element selectors are used',
      'Class selectors are applied',
      'ID selector is used',
      'Color properties are set',
      'Font properties are applied',
      'Spacing is properly defined',
      'Attribute selectors work',
      'Text properties are styled',
      'CSS is valid and organized'
    ],
    jestTestFile: `describe('CSS Selectors & Basic Styling', () => {
  test('style tag exists in head', () => {
    const styleTag = document.querySelector('head style');
    expect(styleTag).toBeTruthy();
  });

  test('h1 element has styling', () => {
    const h1 = document.querySelector('h1');
    expect(h1).toBeTruthy();
    const styles = window.getComputedStyle(h1);
    expect(styles.fontSize).toBeTruthy();
  });

  test('elements with class have styling', () => {
    const classElements = document.querySelectorAll('[class]');
    expect(classElements.length).toBeGreaterThan(0);
  });

  test('ID selector is used', () => {
    const idElements = document.querySelectorAll('[id]');
    expect(idElements.length).toBeGreaterThan(0);
  });

  test('color properties are applied', () => {
    const elements = document.querySelectorAll('*');
    let hasColor = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.color !== 'rgba(0, 0, 0, 0)' && styles.color !== 'transparent') {
        hasColor = true;
      }
    });
    expect(hasColor).toBe(true);
  });

  test('font properties are applied', () => {
    const elements = document.querySelectorAll('*');
    let hasFont = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.fontSize && styles.fontSize !== '0px') {
        hasFont = true;
      }
    });
    expect(hasFont).toBe(true);
  });

  test('margin or padding is applied', () => {
    const elements = document.querySelectorAll('*');
    let hasSpacing = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const margin = parseInt(styles.margin);
      const padding = parseInt(styles.padding);
      if (margin > 0 || padding > 0) {
        hasSpacing = true;
      }
    });
    expect(hasSpacing).toBe(true);
  });

  test('text-align property is used', () => {
    const elements = document.querySelectorAll('*');
    let hasTextAlign = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.textAlign && styles.textAlign !== 'start') {
        hasTextAlign = true;
      }
    });
    expect(hasTextAlign).toBe(true);
  });

  test('background color is applied', () => {
    const elements = document.querySelectorAll('*');
    let hasBackground = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        hasBackground = true;
      }
    });
    expect(hasBackground).toBe(true);
  });

  test('multiple selectors are used', () => {
    const styleTag = document.querySelector('head style');
    const cssText = styleTag.textContent;
    const hasElementSelector = /^[a-z]+\s*\{/m.test(cssText);
    const hasClassSelector = /\.[a-zA-Z]/m.test(cssText);
    const hasIdSelector = /#[a-zA-Z]/m.test(cssText);
    expect(hasElementSelector || hasClassSelector || hasIdSelector).toBe(true);
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'A styled webpage with various CSS selectors, colors, fonts, and spacing applied correctly.',
    difficulty: 'easy',
    tags: ['CSS', 'Selectors', 'Styling', 'Colors', 'Fonts'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'CSS Box Model & Layout',
    problemStatement: 'Create a layout using CSS box model properties including margin, padding, border, and width/height. Demonstrate proper spacing and layout techniques with multiple elements.',
    requirements: [
      'Create a container div with specific width and height',
      'Apply border property with color, style, and width',
      'Set margin for spacing between elements',
      'Apply padding for internal spacing',
      'Use box-sizing property for consistent sizing',
      'Create multiple boxes with different sizes',
      'Apply display property (block, inline-block, or flex)',
      'Set background colors for visual distinction',
      'Use border-radius for rounded corners',
      'Ensure proper alignment and spacing'
    ],
    acceptanceCriteria: [
      'Container has defined width and height',
      'Border is properly styled',
      'Margin is applied correctly',
      'Padding is set appropriately',
      'Box-sizing is used',
      'Multiple boxes exist',
      'Display property is applied',
      'Background colors are set',
      'Border-radius is used',
      'Layout is properly structured'
    ],
    jestTestFile: `describe('CSS Box Model & Layout', () => {
  test('container has width and height', () => {
    const container = document.querySelector('div');
    expect(container).toBeTruthy();
    const styles = window.getComputedStyle(container);
    expect(styles.width).toBeTruthy();
    expect(styles.height).toBeTruthy();
  });

  test('border is applied', () => {
    const elements = document.querySelectorAll('*');
    let hasBorder = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.borderWidth && styles.borderWidth !== '0px') {
        hasBorder = true;
      }
    });
    expect(hasBorder).toBe(true);
  });

  test('margin is applied', () => {
    const elements = document.querySelectorAll('*');
    let hasMargin = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const marginValue = parseInt(styles.margin);
      if (marginValue > 0) {
        hasMargin = true;
      }
    });
    expect(hasMargin).toBe(true);
  });

  test('padding is applied', () => {
    const elements = document.querySelectorAll('*');
    let hasPadding = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const paddingValue = parseInt(styles.padding);
      if (paddingValue > 0) {
        hasPadding = true;
      }
    });
    expect(hasPadding).toBe(true);
  });

  test('multiple boxes exist', () => {
    const divs = document.querySelectorAll('div');
    expect(divs.length).toBeGreaterThanOrEqual(2);
  });

  test('display property is set', () => {
    const elements = document.querySelectorAll('*');
    let hasDisplay = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display && styles.display !== 'inline') {
        hasDisplay = true;
      }
    });
    expect(hasDisplay).toBe(true);
  });

  test('background color is applied to boxes', () => {
    const elements = document.querySelectorAll('div');
    let hasBackground = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        hasBackground = true;
      }
    });
    expect(hasBackground).toBe(true);
  });

  test('border-radius is used', () => {
    const elements = document.querySelectorAll('*');
    let hasBorderRadius = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.borderRadius && styles.borderRadius !== '0px') {
        hasBorderRadius = true;
      }
    });
    expect(hasBorderRadius).toBe(true);
  });

  test('box model properties are consistent', () => {
    const container = document.querySelector('div');
    expect(container).toBeTruthy();
    const styles = window.getComputedStyle(container);
    expect(styles.width).toBeTruthy();
    expect(styles.padding).toBeTruthy();
    expect(styles.margin).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'A properly structured layout with correct box model properties, borders, margins, padding, and visual distinction.',
    difficulty: 'medium',
    tags: ['CSS', 'Box Model', 'Layout', 'Spacing', 'Borders'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'CSS Flexbox Layout',
    problemStatement: 'Create a responsive layout using CSS Flexbox. Implement flex containers with proper alignment, justification, and direction properties to create flexible and responsive designs.',
    requirements: [
      'Create a flex container with display: flex',
      'Set flex-direction property (row or column)',
      'Apply justify-content for main axis alignment',
      'Apply align-items for cross axis alignment',
      'Create flex items with flex property',
      'Use flex-wrap for wrapping behavior',
      'Set gap property for spacing between items',
      'Apply flex-grow and flex-shrink properties',
      'Create responsive flex layout',
      'Ensure proper alignment and distribution'
    ],
    acceptanceCriteria: [
      'Flex container exists',
      'Flex-direction is set',
      'Justify-content is applied',
      'Align-items is applied',
      'Flex items exist',
      'Flex-wrap is used',
      'Gap property is set',
      'Flex-grow or flex-shrink is used',
      'Layout is responsive',
      'Items are properly aligned'
    ],
    jestTestFile: `describe('CSS Flexbox Layout', () => {
  test('flex container exists', () => {
    const elements = document.querySelectorAll('*');
    let hasFlexContainer = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display === 'flex') {
        hasFlexContainer = true;
      }
    });
    expect(hasFlexContainer).toBe(true);
  });

  test('flex-direction is set', () => {
    const elements = document.querySelectorAll('*');
    let hasFlexDirection = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display === 'flex' && styles.flexDirection) {
        hasFlexDirection = true;
      }
    });
    expect(hasFlexDirection).toBe(true);
  });

  test('justify-content is applied', () => {
    const elements = document.querySelectorAll('*');
    let hasJustifyContent = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display === 'flex' && styles.justifyContent && styles.justifyContent !== 'normal') {
        hasJustifyContent = true;
      }
    });
    expect(hasJustifyContent).toBe(true);
  });

  test('align-items is applied', () => {
    const elements = document.querySelectorAll('*');
    let hasAlignItems = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display === 'flex' && styles.alignItems && styles.alignItems !== 'normal') {
        hasAlignItems = true;
      }
    });
    expect(hasAlignItems).toBe(true);
  });

  test('flex items exist', () => {
    const elements = document.querySelectorAll('*');
    let flexContainer = null;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display === 'flex') {
        flexContainer = el;
      }
    });
    expect(flexContainer).toBeTruthy();
    if (flexContainer) {
      const children = flexContainer.children;
      expect(children.length).toBeGreaterThan(0);
    }
  });

  test('gap property is set', () => {
    const elements = document.querySelectorAll('*');
    let hasGap = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display === 'flex' && styles.gap && styles.gap !== '0px') {
        hasGap = true;
      }
    });
    expect(hasGap).toBe(true);
  });

  test('flex-wrap is applied', () => {
    const elements = document.querySelectorAll('*');
    let hasFlexWrap = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display === 'flex' && styles.flexWrap && styles.flexWrap !== 'nowrap') {
        hasFlexWrap = true;
      }
    });
    expect(hasFlexWrap).toBe(true);
  });

  test('flex items have flex properties', () => {
    const elements = document.querySelectorAll('*');
    let flexContainer = null;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display === 'flex') {
        flexContainer = el;
      }
    });
    expect(flexContainer).toBeTruthy();
    if (flexContainer) {
      const children = flexContainer.children;
      let hasFlexProperty = false;
      for (let child of children) {
        const childStyles = window.getComputedStyle(child);
        if (childStyles.flex && childStyles.flex !== 'none') {
          hasFlexProperty = true;
        }
      }
      expect(hasFlexProperty).toBe(true);
    }
  });

  test('layout is responsive', () => {
    const flexContainer = document.querySelector('[style*="flex"]');
    expect(flexContainer).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'A responsive flexbox layout with proper alignment, justification, and flex properties applied.',
    difficulty: 'medium',
    tags: ['CSS', 'Flexbox', 'Layout', 'Responsive', 'Alignment'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'CSS Grid Layout',
    problemStatement: 'Create a responsive grid layout using CSS Grid. Implement grid containers with proper column and row definitions, gap spacing, and grid item placement.',
    requirements: [
      'Create a grid container with display: grid',
      'Define grid-template-columns with multiple columns',
      'Define grid-template-rows with multiple rows',
      'Set gap property for spacing',
      'Create grid items that fill the grid',
      'Use grid-column and grid-row for item placement',
      'Apply auto-fit or auto-fill for responsive columns',
      'Set minimum and maximum column widths',
      'Apply grid-auto-flow property',
      'Ensure proper grid structure and alignment'
    ],
    acceptanceCriteria: [
      'Grid container exists',
      'Grid-template-columns is defined',
      'Grid-template-rows is defined',
      'Gap is set',
      'Grid items exist',
      'Grid-column or grid-row is used',
      'Responsive grid is implemented',
      'Column widths are defined',
      'Grid-auto-flow is applied',
      'Grid structure is proper'
    ],
    jestTestFile: `describe('CSS Grid Layout', () => {
  test('grid container exists', () => {
    const elements = document.querySelectorAll('*');
    let hasGridContainer = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display === 'grid') {
        hasGridContainer = true;
      }
    });
    expect(hasGridContainer).toBe(true);
  });

  test('grid-template-columns is defined', () => {
    const elements = document.querySelectorAll('*');
    let hasGridColumns = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display === 'grid' && styles.gridTemplateColumns && styles.gridTemplateColumns !== 'none') {
        hasGridColumns = true;
      }
    });
    expect(hasGridColumns).toBe(true);
  });

  test('grid-template-rows is defined', () => {
    const elements = document.querySelectorAll('*');
    let hasGridRows = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display === 'grid' && styles.gridTemplateRows && styles.gridTemplateRows !== 'none') {
        hasGridRows = true;
      }
    });
    expect(hasGridRows).toBe(true);
  });

  test('gap is set', () => {
    const elements = document.querySelectorAll('*');
    let hasGap = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display === 'grid' && styles.gap && styles.gap !== '0px') {
        hasGap = true;
      }
    });
    expect(hasGap).toBe(true);
  });

  test('grid items exist', () => {
    const elements = document.querySelectorAll('*');
    let gridContainer = null;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display === 'grid') {
        gridContainer = el;
      }
    });
    expect(gridContainer).toBeTruthy();
    if (gridContainer) {
      const children = gridContainer.children;
      expect(children.length).toBeGreaterThan(0);
    }
  });

  test('grid items have content', () => {
    const elements = document.querySelectorAll('*');
    let gridContainer = null;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.display === 'grid') {
        gridContainer = el;
      }
    });
    expect(gridContainer).toBeTruthy();
    if (gridContainer) {
      const children = gridContainer.children;
      let hasContent = false;
      for (let child of children) {
        if (child.textContent.trim().length > 0 || child.children.length > 0) {
          hasContent = true;
        }
      }
      expect(hasContent).toBe(true);
    }
  });

  test('grid-column or grid-row is used', () => {
    const elements = document.querySelectorAll('*');
    let hasGridPlacement = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if ((styles.gridColumn && styles.gridColumn !== 'auto') || (styles.gridRow && styles.gridRow !== 'auto')) {
        hasGridPlacement = true;
      }
    });
    expect(hasGridPlacement).toBe(true);
  });

  test('grid is responsive', () => {
    const gridContainer = document.querySelector('[style*="grid"]');
    expect(gridContainer).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'A responsive grid layout with proper columns, rows, gap spacing, and grid item placement.',
    difficulty: 'hard',
    tags: ['CSS', 'Grid', 'Layout', 'Responsive', 'Columns'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'CSS Animations & Transitions',
    problemStatement: 'Create animated elements using CSS transitions and animations. Implement smooth transitions on hover, property changes, and keyframe animations for dynamic visual effects.',
    requirements: [
      'Create transition properties for smooth property changes',
      'Apply transition-duration and transition-timing-function',
      'Create hover effects with transitions',
      'Define keyframe animations with @keyframes',
      'Apply animation-name and animation-duration',
      'Set animation-iteration-count for repeating animations',
      'Use animation-direction for forward/reverse/alternate',
      'Apply transform properties for animations',
      'Create multiple animations on different elements',
      'Ensure smooth and performant animations'
    ],
    acceptanceCriteria: [
      'Transition properties exist',
      'Transition-duration is set',
      'Hover effects work',
      'Keyframe animations exist',
      'Animation-name is applied',
      'Animation-duration is set',
      'Animation-iteration-count is used',
      'Animation-direction is applied',
      'Transform properties are used',
      'Animations are smooth'
    ],
    jestTestFile: `describe('CSS Animations & Transitions', () => {
  test('transition properties exist', () => {
    const styleTag = document.querySelector('head style');
    expect(styleTag).toBeTruthy();
    const cssText = styleTag.textContent;
    expect(cssText.includes('transition')).toBe(true);
  });

  test('transition-duration is set', () => {
    const elements = document.querySelectorAll('*');
    let hasTransitionDuration = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.transitionDuration && styles.transitionDuration !== '0s') {
        hasTransitionDuration = true;
      }
    });
    expect(hasTransitionDuration).toBe(true);
  });

  test('keyframe animations exist', () => {
    const styleTag = document.querySelector('head style');
    expect(styleTag).toBeTruthy();
    const cssText = styleTag.textContent;
    expect(cssText.includes('@keyframes')).toBe(true);
  });

  test('animation-name is applied', () => {
    const elements = document.querySelectorAll('*');
    let hasAnimationName = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.animationName && styles.animationName !== 'none') {
        hasAnimationName = true;
      }
    });
    expect(hasAnimationName).toBe(true);
  });

  test('animation-duration is set', () => {
    const elements = document.querySelectorAll('*');
    let hasAnimationDuration = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.animationDuration && styles.animationDuration !== '0s') {
        hasAnimationDuration = true;
      }
    });
    expect(hasAnimationDuration).toBe(true);
  });

  test('transform properties are used', () => {
    const styleTag = document.querySelector('head style');
    expect(styleTag).toBeTruthy();
    const cssText = styleTag.textContent;
    expect(cssText.includes('transform')).toBe(true);
  });

  test('hover effects exist', () => {
    const styleTag = document.querySelector('head style');
    expect(styleTag).toBeTruthy();
    const cssText = styleTag.textContent;
    expect(cssText.includes(':hover')).toBe(true);
  });

  test('animation-iteration-count is set', () => {
    const elements = document.querySelectorAll('*');
    let hasIterationCount = false;
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.animationIterationCount && styles.animationIterationCount !== '1') {
        hasIterationCount = true;
      }
    });
    expect(hasIterationCount).toBe(true);
  });

  test('multiple animations exist', () => {
    const styleTag = document.querySelector('head style');
    expect(styleTag).toBeTruthy();
    const cssText = styleTag.textContent;
    const keyframeCount = (cssText.match(/@keyframes/g) || []).length;
    expect(keyframeCount).toBeGreaterThanOrEqual(1);
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'Animated elements with smooth transitions, keyframe animations, hover effects, and transform properties.',
    difficulty: 'hard',
    tags: ['CSS', 'Animations', 'Transitions', 'Keyframes', 'Effects'],
    tenant: null,
    createdBy: null,
    isActive: true
  }
];

async function seed5CSSQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    await FrontendQuestion.deleteMany({ title: { $in: cssQuestions.map(q => q.title) } });
    console.log('Deleted existing CSS questions');

    for (const question of cssQuestions) {
      await FrontendQuestion.create({
        ...question,
        tenant: tenant._id,
        createdBy: instructor._id
      });
      console.log(`✓ Created: ${question.title}`);
    }

    console.log(`\n✓ All ${cssQuestions.length} CSS questions created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seed5CSSQuestions();
