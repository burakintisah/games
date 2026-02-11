import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
  title?: string;
  retryLabel?: string;
}

export function ErrorMessage({ message, onRetry, className = '', title = 'Something went wrong', retryLabel = 'Try Again' }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      role="alert"
      className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="w-6 h-6 text-red-600" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-red-800">{title}</h3>
      </div>

      <p className="text-red-700 mb-4">{message}</p>

      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          {retryLabel}
        </motion.button>
      )}
    </motion.div>
  );
}
