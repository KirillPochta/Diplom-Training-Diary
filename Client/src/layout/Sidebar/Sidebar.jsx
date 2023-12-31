//styles
import { Container, MainBox, StyledLogo, ItemsBox } from "./Sidebar.styles";

//icons
import {FaLightbulb, FaTag } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

//redux
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, toggleTagsModal } from "../../features";

//others
import { NavLink, useLocation } from "react-router-dom";
import useOutsideClick from "../../custom-hooks/outsideClickHook";
import { getStandardName } from "../../utils";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.menu);
  const { tagsList } = useSelector((state) => state.tags);

  //getting path
  const location = useLocation();
  const { pathname } = location;

  //custom hook for closing menu
  const nodeRef = useOutsideClick(() => dispatch(toggleMenu(false)));

  if (pathname !== "/notes" && pathname !== "/archive" &&
    pathname !== "/trash" && !pathname.includes("/tag")) {
    return;
  }

  import('./Sidebar.css')

  return (
    <Container style={{paddingTop: 0}} openMenu={isOpen && "open"}>
      <MainBox openMenu={isOpen && "open"} ref={nodeRef}>
        <StyledLogo>
          <span>Заметки</span>
        </StyledLogo>

        <ItemsBox>
          {/* note item */}
          <li onClick={() => dispatch(toggleMenu(false))}>
            <NavLink
              to={`/notes`}
              state={`notes`}
              className={({ isActive }) =>
                isActive ? "active-item" : "inactive-item"
              }
            >
              <span>
                <FaLightbulb />
              </span>
              <span>Заметки</span>
            </NavLink>
          </li>

          {/*tags item */}

          {tagsList?.map(({ tag, id }) => (
            <li key={id} onClick={() => dispatch(toggleMenu(false))}>
              <NavLink
                to={`/tag/${tag}`}
                state={`${tag}`}
                className={({ isActive }) =>
                  isActive ? "active-item" : "inactive-item"
                }
              >
                <span>
                  <FaTag />
                </span>
                <span>{getStandardName(tag)}</span>
              </NavLink>
            </li>
          ))}

          {/* edit tag item */}

          <li
            className="sidebar__edit-item"
            onClick={() =>
              dispatch(toggleTagsModal({ type: "edit", view: true }))
            }
          >
            <span>
              <MdEdit />
            </span>
            <span>Редактировать заметки</span>
          </li>
          
        </ItemsBox>
      </MainBox>
    </Container>
  );
};

export default Sidebar;
