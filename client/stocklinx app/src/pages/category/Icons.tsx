import { type MRT_Icons } from "mantine-react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesDown,
  faBars,
  faBarsStaggered,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCircleXmark,
  faColumns,
  faCompress,
  faEdit,
  faEllipsisH,
  faEllipsisV,
  faExpand,
  faEyeSlash,
  faFilter,
  faFilterCircleXmark,
  faFloppyDisk,
  faGrip,
  faLayerGroup,
  faSearch,
  faSearchMinus,
  faSort,
  faSortDown,
  faSortUp,
  faTextWidth,
  faThumbTack,
  faX,
} from "@fortawesome/free-solid-svg-icons"; //replace free solid with your desired icon set
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
export const fontAwesomeIcons: Partial<MRT_Icons> = {
  IconArrowAutofitContent: (props: any) => (
    <FontAwesomeIcon icon={faTextWidth} size="sm" {...props} />
  ),
  IconArrowsSort: (props: any) => (
    <FontAwesomeIcon icon={faSort} size="sm" {...props} />
  ),
  IconBoxMultiple: (props: any) => (
    <FontAwesomeIcon icon={faLayerGroup} size="sm" {...props} />
  ),
  IconChevronDown: (props: any) => (
    <FontAwesomeIcon icon={faChevronDown} size="sm" {...props} />
  ),
  IconChevronLeft: (props: any) => (
    <FontAwesomeIcon icon={faChevronLeft} size="sm" {...props} />
  ),
  IconChevronRight: (props: any) => (
    <FontAwesomeIcon icon={faChevronRight} size="sm" {...props} />
  ),
  IconChevronsDown: (props: any) => (
    <FontAwesomeIcon icon={faAnglesDown} size="sm" {...props} />
  ),
  IconCircleX: (props: any) => (
    <FontAwesomeIcon icon={faCircleXmark} size="sm" {...props} />
  ),
  IconClearAll: (props: any) => (
    <FontAwesomeIcon icon={faBarsStaggered} size="sm" {...props} />
  ),
  IconColumns: (props: any) => (
    <FontAwesomeIcon icon={faColumns} size="sm" {...props} />
  ),
  IconDeviceFloppy: (props: any) => (
    <FontAwesomeIcon icon={faFloppyDisk} size="sm" {...props} />
  ),
  IconDots: (props: any) => (
    <FontAwesomeIcon icon={faEllipsisH} size="sm" {...props} />
  ),
  IconDotsVertical: (props: any) => (
    <FontAwesomeIcon icon={faEllipsisV} size="sm" {...props} />
  ),
  IconEdit: (props: any) => (
    <FontAwesomeIcon icon={faEdit} size="sm" {...props} />
  ),
  IconEyeOff: (props: any) => (
    <FontAwesomeIcon icon={faEyeSlash} size="sm" {...props} />
  ),
  IconFilter: (props: any) => (
    <FontAwesomeIcon icon={faFilter} size="sm" {...props} />
  ),
  IconFilterOff: (props: any) => (
    <FontAwesomeIcon icon={faFilterCircleXmark} size="sm" {...props} />
  ),
  IconGripHorizontal: (props: any) => (
    <FontAwesomeIcon icon={faGrip} size="sm" {...props} />
  ),
  IconMaximize: (props: any) => (
    <FontAwesomeIcon icon={faExpand} size="sm" {...props} />
  ),
  IconMinimize: (props: any) => (
    <FontAwesomeIcon icon={faCompress} size="sm" {...props} />
  ),
  IconPinned: (props: any) => (
    <FontAwesomeIcon icon={faThumbTack} size="sm" {...props} />
  ),
  IconPinnedOff: (props: any) => (
    <FontAwesomeIcon icon={faThumbTack} size="sm" {...props} />
  ),
  IconSearch: (props: any) => (
    <FontAwesomeIcon icon={faSearch} size="sm" {...props} />
  ),
  IconSearchOff: (props: any) => (
    <FontAwesomeIcon icon={faSearchMinus} size="sm" {...props} />
  ),
  IconSortAscending: (props: any) => (
    <FontAwesomeIcon icon={faSortUp} size="sm" {...props} />
  ),
  IconSortDescending: (props: any) => (
    <FontAwesomeIcon icon={faSortDown} size="sm" {...props} />
  ),
  IconBaselineDensityLarge: (props: any) => (
    <FontAwesomeIcon icon={faBars} size="sm" {...props} />
  ),
  IconBaselineDensityMedium: (props: any) => (
    <FontAwesomeIcon icon={faBars} size="sm" {...props} />
  ),
  IconBaselineDensitySmall: (props: any) => (
    <FontAwesomeIcon icon={faBars} size="sm" {...props} />
  ),
  IconX: (props: any) => <FontAwesomeIcon icon={faX} size="sm" {...props} />,
};
