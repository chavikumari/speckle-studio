import { Button, Star } from "@/components/ui/Elements";
export default function NotFound() {
  return (
    <main id="main" className="section inner-hero">
      <Star />
      <p className="eyebrow">404 / A little detour</p>
      <h1>
        This speck
        <br />
        wandered off.
      </h1>
      <Button href="/">Back to the studio</Button>
    </main>
  );
}
