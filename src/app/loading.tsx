import { CircularProgress } from "@mui/material";
import styles from "./loading.module.scss";
export default function Loading() {
    return (
        <div className={styles.loading}>
            <CircularProgress />
        </div>
    )
}