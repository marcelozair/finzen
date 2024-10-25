import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { optionMenuIcon } from "../../../../constants/assets/walletAssets";

export const OptionsWallet = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button 
          type="button"
          className="p-2 outline-none bg-white rounded-md border-gray-100 border-[1px]"
        >
          <img alt="option menu icon" src={optionMenuIcon} />
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="edit">Editar</DropdownItem>
        <DropdownItem key="edit">Archivar</DropdownItem>
        <DropdownItem key="copy">Crear objetivo</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Eliminar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}