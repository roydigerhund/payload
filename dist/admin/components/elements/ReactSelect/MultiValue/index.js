"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiValue = void 0;
const react_1 = __importDefault(require("react"));
const react_select_1 = require("react-select");
const useDraggableSortable_1 = require("../../DraggableSortable/useDraggableSortable");
require("./index.scss");
const baseClass = 'multi-value';
const MultiValue = (props) => {
    const { className, isDisabled, innerProps, data: { value, }, customProps: { disableMouseDown, } = {}, } = props;
    const { attributes, listeners, setNodeRef, transform, isDragging, } = (0, useDraggableSortable_1.useDraggableSortable)({
        id: value.toString(),
    });
    const classes = [
        baseClass,
        className,
        !isDisabled && 'draggable',
        isDragging && `${baseClass}--is-dragging`,
    ].filter(Boolean).join(' ');
    return (react_1.default.createElement(react_select_1.components.MultiValue, { ...props, className: classes, innerProps: {
            ...innerProps,
            ...attributes,
            ...listeners,
            ref: setNodeRef,
            onMouseDown: (e) => {
                if (!disableMouseDown) {
                    // we need to prevent the dropdown from opening when clicking on the drag handle, but not when a modal is open (i.e. the 'Relationship' field component)
                    e.preventDefault();
                    e.stopPropagation();
                }
            },
            style: {
                transform,
            },
        } }));
};
exports.MultiValue = MultiValue;
//# sourceMappingURL=index.js.map