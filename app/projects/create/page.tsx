"use client";

import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CreateProject() {
    const router = useRouter();

    return (
        <Dialog open={true} onClose={() => router.back()} fullScreen>
            <DialogContent>
                <p>fdasddf</p>
            </DialogContent>
            <DialogActions>
                <Button>Cancel</Button>
                <Button>Update</Button>
            </DialogActions>
        </Dialog>
    );
}