import Badge from "../components/badge";
import Text from "../components/text";

interface TasksSummaryProps {
  total: number;
  concluded: number;
  loading?: boolean;
}

export default function TasksSummary({
  total,
  concluded,
  loading,
}: TasksSummaryProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Text variant="body-sm-bold" className="text-gray-300!">
          Tarefas Criadas
        </Text>
        <Badge variant="secondary" loading={loading}>
          {total}
        </Badge>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Text variant="body-sm-bold" className="text-gray-300!">
          Concluídas
        </Text>
        <Badge variant="primary" loading={loading}>
          {concluded} de {total}
        </Badge>
      </div>
    </div>
  );
}
