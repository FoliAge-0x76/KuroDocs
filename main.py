from pathlib import Path

from jinja2 import Environment, FileSystemLoader
from markupsafe import Markup


TEMPLATE_ENV = Environment(
    loader=FileSystemLoader(Path(__file__).parent / "docs" / "templates"),
    autoescape=True,
)
INFOBOX_TEMPLATE = TEMPLATE_ENV.get_template("infobox.html")


def normalize_image_scale(scale):
    if scale is None:
        return "100%"

    try:
        scale = float(scale)
    except (TypeError, ValueError) as error:
        raise ValueError("image_scale must be a number between 1 and 100") from error

    if not 1 <= scale <= 100:
        raise ValueError("image_scale must be a number between 1 and 100")

    return f"{scale:g}%"


def define_env(env):
    @env.macro
    def infobox(
        title,
        image=None,
        image_caption=None,
        image_alt=None,
        image_scale=None,
        image_2=None,
        image_caption_2=None,
        image_alt_2=None,
        image_scale_2=None,
        field_1_name=None,
        field_1_value=None,
        field_2_name=None,
        field_2_value=None,
        field_3_name=None,
        field_3_value=None,
        field_4_name=None,
        field_4_value=None,
        field_5_name=None,
        field_5_value=None,
        field_6_name=None,
        field_6_value=None,
    ):
        fields = [
            (field_1_name, field_1_value),
            (field_2_name, field_2_value),
            (field_3_name, field_3_value),
            (field_4_name, field_4_value),
            (field_5_name, field_5_value),
            (field_6_name, field_6_value),
        ]
        return Markup(
            INFOBOX_TEMPLATE.render(
                title=title,
                image=image,
                image_caption=image_caption,
                image_alt=image_alt,
                image_scale=normalize_image_scale(image_scale),
                image_2=image_2,
                image_caption_2=image_caption_2,
                image_alt_2=image_alt_2,
                image_scale_2=normalize_image_scale(image_scale_2),
                fields=fields,
            )
        )