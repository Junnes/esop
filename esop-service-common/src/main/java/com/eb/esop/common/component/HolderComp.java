package com.eb.esop.common.component;

import com.eb.esop.common.model.Holder;

public class HolderComp extends ComponentAdapter {

	@Override
	protected Object innerConvert() {
		return ((Holder<?>) obj).getData();
	}

}
