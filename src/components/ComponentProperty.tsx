// Generated with Ion on 2/26/2024, 3:56:07 PM
// Figma Link: https://www.figma.com/file/Qohyu8a8oaVqtDvIRuY120?node-id=2359:7742
import clsx from "clsx";
type ComponentPropertyProps = {
  isSubcomponentProperty?: boolean;
  name?: string;
  subcomponent?: string;
  description?: string;
  className?: string;
};

function ComponentProperty({
  isSubcomponentProperty = true,
  name = "title",
  subcomponent = "ion/AvatarStatus/",
  description = "Controls the title of the label",
  className = "",
}: ComponentPropertyProps) {
  return (
    <div className={clsx("w-[736px] flex-col flex h-fit", className)}>
      <div className="flex items-start">
        {isSubcomponentProperty && (
          <div className="text-xl text-gray-400">{subcomponent}</div>
        )}
        <div className="text-xl font-semibold text-gray-800">{name}</div>
      </div>
      <div className="text-lg text-gray-800 max-w-[750px]">{description}</div>
    </div>
  );
}
export default ComponentProperty;
