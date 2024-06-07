interface RepresentativeCardProps {
  title: string;
  label: string;
  onClick?: () => void;
}

const RepresentativeCard: React.FC<RepresentativeCardProps> = ({
  title,
  label,
  onClick,
}) => {
  return (
    <div className="representative-card" onClick={onClick}>
      <div className="representative-card__title">{title}</div>
      <div className="representative-card__label">{label}</div>
    </div>
  );
};

export default RepresentativeCard;
