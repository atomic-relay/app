import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * Footer component with credits and links.
 */
const Footer = () => {
  return (
    <footer className="flex items-center justify-center h-14 w-full pb-10 px-20">
      <div className="flex flex-row items-center justify-between h-full w-[854px]">
        <div className="flex flex-row gap-4 items-center text-sm">
          <p className="text-muted-foreground text-sm">Built with</p>
          <Link
            href="https://tailwindcss.com/"
            rel="noopener noreferrer"
            target="_blank"
            className="no-underline"
          >
            tailwindcss.com
          </Link>
          <Link
            href="https://ui.shadcn.com/"
            rel="noopener noreferrer"
            target="_blank"
            className="no-underline"
          >
            ui.shadcn.com
          </Link>
          <Link
            href="https://replit.com/"
            rel="noopener noreferrer"
            target="_blank"
            className="no-underline"
          >
            replit.com
          </Link>
        </div>
        <Dialog>
          <div className="flex flex-row gap-4 items-center text-sm">
            <DialogTrigger asChild>
              <Button variant="link" className="no-underline">
                Credits
              </Button>
            </DialogTrigger>
            <DialogContent className="overflow-scroll custom-height-mq:h-full">
              <LicenseDialog />
            </DialogContent>
          </div>
        </Dialog>
      </div>
    </footer>
  );
};

const LicenseDialog = () => {
  return (
    <>
      <DialogTitle>
        <div className="text-lg font-semibold">Licenses</div>
      </DialogTitle>
      <p className="text-muted-foreground">
        Thank you to the open source community for your support.
      </p>
      <DialogTitle>MIT License Copyright (c) 2023 shadcn</DialogTitle>
      <p className="text-muted-foreground">
        Permission is hereby granted, free of charge, to any person obtaining a
        copy of this software and associated documentation files (the
        "Software"), to deal in the Software without restriction, including
        without limitation the rights to use, copy, modify, merge, publish,
        distribute, sublicense, and/or sell copies of the Software, and to
        permit persons to whom the Software is furnished to do so, subject to
        the following conditions:
      </p>
      <p className="text-muted-foreground">
        The above copyright notice and this permission notice shall be included
        in all copies or substantial portions of the Software.
      </p>
      <p className="text-muted-foreground">
        THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
        THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
        OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
        ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
        OTHER DEALINGS IN THE SOFTWARE.
      </p>
    </>
  );
};

export default Footer;
